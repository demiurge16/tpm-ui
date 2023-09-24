import { useEffect, useState } from 'react';
import { Accuracy } from '../../client/types/dictionaries/Accuracy';
import { Industry } from '../../client/types/dictionaries/Industry';
import { Unit } from '../../client/types/dictionaries/Unit';
import { Client } from '../../client/types/client/Client';
import { useNavigate, useParams } from 'react-router-dom';
import { useTpmClient } from '../../contexts/TpmClientContext';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useBreadcrumbsContext } from '../../contexts/BreadcrumbsContext';
import { Project, UpdateProject } from '../../client/types/project/Project';
import { array, number, object, string } from 'yup';
import { forkJoin } from 'rxjs';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { validateWithSchema } from '../../utils/validate';
import { TextField } from '../../components/form-controls/TextField';
import { SelectField } from '../../components/form-controls/SelectField';
import { AsyncSelectField } from '../../components/form-controls/AsyncSelectField';
import { NumberField } from '../../components/form-controls/NumberField';
import { LoadingScreen } from '../utils/LoadingScreen';


export const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [project, setProject] = useState<Project>({} as Project);
  const [initialValues, setInitialValues] = useState<UpdateProject>({} as UpdateProject);
  const [accuracies, setAccuracies] = useState<Array<Accuracy>>([]);
  const [industries, setIndustries] = useState<Array<Industry>>([]);
  const [units, setUnits] = useState<Array<Unit>>([]);
  const [serviceTypes, setServiceTypes] = useState<Array<any>>([]);
  const [clients, setClients] = useState<Array<Client>>([]);

  const navigate = useNavigate();
  const tpmClient = useTpmClient();

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();;

  const { id } = useParams();

  const validationSchema = object({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    sourceLanguage: string().required('Source language is required'),
    targetLanguages: array().min(1, 'At least one target language is required'),
    accuracyId: string().required('Accuracy is required'),
    industryId: string().required('Industry is required'),
    unitId: string().required('Unit is required'),
    serviceTypeIds: array().min(1, 'At least one service type is required'),
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
      serviceTypes: tpmClient.serviceTypes().all(),
      clients: tpmClient.clients().all()
    }).subscribe({
      next: (response) => {
        const { project, accuracies, industries, units, serviceTypes, clients } = response;

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
        setServiceTypes(serviceTypes.items);
        setClients(clients.items);
        setLoading(false);

        setBreadcrumbs([
          { label: 'Projects', path: '/projects' },
          { label: project.title, path: `/projects/${project.id}` },
          { label: 'Edit', path: `/projects/${project.id}/edit` }
        ]);
      },
      error: (error) => {
        showError('Error loading reference data', error.message);
      }
    });
  }, [id, setBreadcrumbs, showError, tpmClient]);

  const handleSubmit = (values: UpdateProject) => {
    if (!id) {
      return;
    }

    tpmClient.projects()
      .withId(id)
      .update(values)
      .subscribe({
        next: (response) => {
          showSuccess('Success', 'Project updated');
          navigate(`/projects/${response.id}`);
        },
        error: (error) => {
          showError(error.message, error.response.data.message);
          setServerError(error.message);
        }
      });
  }

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen /> 
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4">Edit {project.title}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={initialValues}
        validate={(values) => validateWithSchema(validationSchema, values)}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Project Details</Typography>
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
                <Grid item xs={12}>
                  <SelectField name="serviceTypeIds" label="Service Types" required multiple
                    options={serviceTypes.map((serviceType) => ({ key: serviceType.id, value: serviceType.name }))}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Languages</Typography>
              <Grid container columnSpacing={2}>
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
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Project size</Typography>
              <Grid container columnSpacing={2}>
                <Grid item xs={6}>
                  <NumberField name="amount" label="Amount" required/>
                </Grid>
                <Grid item xs={6}>
                  <SelectField name="unitId" label="Unit" required
                    options={units.map((unit) => ({ key: unit.id, value: unit.name }))}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Budget</Typography>
              <Grid container columnSpacing={2}>
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
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Client</Typography>
              <Grid container columnSpacing={2}>
                <Grid item xs={12}>
                  <SelectField name="clientId" label="Client" required
                    options={clients.map((client) => ({ key: client.id, value: client.name }))}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />

            {serverError && (
              <>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography color="error">Error: {serverError}</Typography>
                </Paper>
                <Box pb={2} />
              </>
            )}

            <Paper elevation={2} sx={{ p: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" disabled={submitting || pristine}>
                  Submit
                </Button>
                <Button type="button" disabled={submitting || pristine} onClick={() => form.reset()}>
                  Reset
                </Button>
              </Box>
            </Paper>
          </form>
        )}
      />
    </Box>
  );
};
