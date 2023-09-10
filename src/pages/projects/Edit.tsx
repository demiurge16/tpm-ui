import React, { useContext, useEffect, useState } from 'react';
import { Accuracy } from '../../client/types/dictionaries/Accuracy';
import { Industry } from '../../client/types/dictionaries/Industry';
import { Unit } from '../../client/types/dictionaries/Unit';
import { Client } from '../../client/types/client/Client';
import { useNavigate, useParams } from 'react-router-dom';
import { useTpmClient } from '../../contexts/TpmClientContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { BreadcrumbsContext } from '../../contexts/BreadcrumbsContext';
import { Project, UpdateProject } from '../../client/types/project/Project';
import { array, date, number, object, string } from 'yup';
import { forkJoin, map } from 'rxjs';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { validateWithSchema } from '../../utils/validate';
import { TextField } from '../../components/form-controls/TextField';
import { SelectField } from '../../components/form-controls/SelectField';
import { AsyncSelectField } from '../../components/form-controls/AsyncSelectField';
import { NumberField } from '../../components/form-controls/NumberField';
import { LoadingScreen } from '../utils/LoadingScreen';


export const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const [project, setProject] = useState<Project>({} as Project);
  const [initialValues, setInitialValues] = useState<UpdateProject>({} as UpdateProject);
  const [accuracies, setAccuracies] = useState<Array<Accuracy>>([]);
  const [industries, setIndustries] = useState<Array<Industry>>([]);
  const [units, setUnits] = useState<Array<Unit>>([]);
  const [clients, setClients] = useState<Array<Client>>([]);

  const navigate = useNavigate();
  const tpmClient = useTpmClient();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const { id } = useParams();

  const validationSchema = object({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    sourceLanguage: string().required('Source language is required'),
    targetLanguages: array().min(1, 'At least one target language is required'),
    accuracyId: string().required('Accuracy is required'),
    industryId: string().required('Industry is required'),
    unitId: string().required('Unit is required'),
    amount: number().required('Amount is required')
      .min(1, 'Amount must be greater than or equal to 1'),
    budget: number().required('Budget is required')
      .min(0, 'Budget must be greater than or equal to 0'),
    currencyCode: string().required('Currency is required'),
    clientId: string().required('Client is required')
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    forkJoin({
      project: tpmClient.projects().withId(id).get(),
      accuracies: tpmClient.accuracies().all(),
      industries: tpmClient.industries().all(),
      units: tpmClient.units().all(),
      clients: tpmClient.clients().all()
    }).subscribe({
      next: (response) => {
        const { project, accuracies, industries, units, clients } = response;

        setProject(project);
        setInitialValues({
          title: project.title,
          description: project.description,
          sourceLanguage: project.sourceLanguage.code,
          targetLanguages: project.targetLanguages.map((language) => language.code),
          accuracyId: project.accuracy.id,
          industryId: project.industry.id,
          unitId: project.unit.id,
          serviceTypeIds: project.serviceTypes.map((serviceType) => serviceType.id),
          amount: project.amount,
          budget: project.budget,
          currencyCode: project.currency.code,
          clientId: project.client.id
        });
        setAccuracies(accuracies.items);
        setIndustries(industries.items);
        setUnits(units.items);
        setClients(clients.items);

        breadcrumbsContext.setBreadcrumbs([
          { label: 'Projects', path: '/projects' },
          { label: project.title, path: `/projects/${project.id}` },
          { label: 'Edit', path: `/projects/${project.id}/edit` }
        ]);
      },
      error: (error) => {
        snackbarContext.showError('Error loading reference data', error.message);
      }
    });
  }, []);

  const handleSubmit = (values: UpdateProject) => {
    if (!id) {
      return;
    }

    tpmClient.projects()
      .withId(id)
      .update(values)
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess('Success', 'Project created');
          navigate(`/projects/${response.id}`);
        },
        error: (error) => {
          snackbarContext.showError('Error creating project', error.message);
          setServerError(error.message);
        }
      });
  }

  return project.title ? (
    <Box>
      <Typography variant="h4">Edit {project.title}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={initialValues}
        validate={(values) => validateWithSchema(validationSchema, values)}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12}>
                <TextField name="title" label="Title" required />
              </Grid>
              <Grid item xs={12}>
                <TextField name="description" label="Description" multiline rows={4} required />
              </Grid>
              <Grid item xs={6}>
                <SelectField name="industryId" label="Industry" required
                  options={industries.map((industry) => ({ key: industry.id, value: industry.name }))}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectField name="accuracyId" label="Accuracy" required
                  options={accuracies.map((accuracy) => ({ key: accuracy.id, value: accuracy.name }))}
                />
              </Grid>
              <Grid item xs={6}>
                <AsyncSelectField name="sourceLanguage" label="Source Language" required
                  searchQueryProvider={(search) => (
                    {
                      page: 0,
                      pageSize: 25,
                      sort: [],
                      filters: [
                        {
                          field: 'name',
                          operator: 'contains',
                          value: search
                        }
                      ]
                    }
                  )}
                  resultFormatter={(language) => ({ key: language.code, value: language.name })}
                  optionsLoader={tpmClient.languages().all}
                  defaultValue={{ key: project.sourceLanguage.code, value: project.sourceLanguage.name }}
                />
              </Grid>
              <Grid item xs={6}>
                <AsyncSelectField name="targetLanguages" label="Target Languages" required multiple
                  searchQueryProvider={(search) => (
                    {
                      page: 0,
                      pageSize: 25,
                      sort: [],
                      filters: [
                        {
                          field: 'name',
                          operator: 'contains',
                          value: search
                        }
                      ]
                    }
                  )}
                  resultFormatter={(language) => ({ key: language.code, value: language.name })}
                  optionsLoader={tpmClient.languages().all}
                  defaultValue={project.targetLanguages.map((language) => ({ key: language.code, value: language.name }))}
                />
              </Grid>
              <Grid item xs={6}>
                <NumberField name="amount" label="Amount" required/>
              </Grid>
              <Grid item xs={6}>
                <SelectField name="unitId" label="Unit" required
                  options={units.map((unit) => ({ key: unit.id, value: unit.name }))}
                />
              </Grid>
              <Grid item xs={6}>
                <NumberField name="budget" label="Budget" required/>
              </Grid>
              <Grid item xs={6}>
                <AsyncSelectField name="currencyCode" label="Currency" required
                  searchQueryProvider={(search) => (
                    {
                      page: 0,
                      pageSize: 25,
                      sort: [],
                      filters: [
                        {
                          field: 'name',
                          operator: 'contains',
                          value: search
                        }
                      ]
                    }
                  )}
                  resultFormatter={(currency) => ({ key: currency.code, value: currency.name })}
                  optionsLoader={tpmClient.currencies().all}
                  defaultValue={{ key: project.currency.code, value: project.currency.name }}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectField name="clientId" label="Client" required
                  options={clients.map((client) => ({ key: client.id, value: client.name }))}
                />
              </Grid>
              <Grid item xs={12}>
                <Box pb={2} />
                {serverError && (
                  <Typography color="error">Error: {serverError}</Typography>
                )}
                <Box pb={2} />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" disabled={submitting || pristine}>
                  Submit
                </Button>
                <Button type="button" disabled={submitting || pristine} onClick={() => form.reset()}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </Box>
  ) : (
    <LoadingScreen />
  );
};
