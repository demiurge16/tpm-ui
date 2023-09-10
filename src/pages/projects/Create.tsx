import { useContext, useEffect, useState } from 'react';
import { CreateProject } from "../../client/types/project/Project";
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { BreadcrumbsContext } from '../../contexts/BreadcrumbsContext';
import { useNavigate } from 'react-router-dom';
import { forkJoin, map } from 'rxjs';
import { Accuracy } from '../../client/types/dictionaries/Accuracy';
import { Industry } from '../../client/types/dictionaries/Industry';
import { Unit } from '../../client/types/dictionaries/Unit';
import { Client } from '../../client/types/client/Client';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { TextField } from '../../components/form-controls/TextField';
import { SelectField } from '../../components/form-controls/SelectField';
import { NumberField } from '../../components/form-controls/NumberField';
import { DateTimeField } from '../../components/form-controls/DateTimeField';
import { object, string, array, number, date } from 'yup';
import { AsyncSelectField } from '../../components/form-controls/AsyncSelectField';
import { validateWithSchema } from '../../utils/validate';
import { useTpmClient } from '../../contexts/TpmClientContext';
import { ServiceType } from '../../client/types/dictionaries/ServiceType';

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const [accuracies, setAccuracies] = useState<Array<Accuracy>>([]);
  const [industries, setIndustries] = useState<Array<Industry>>([]);
  const [units, setUnits] = useState<Array<Unit>>([]);
  const [serviceTypes, setServiceTypes] = useState<Array<ServiceType>>([]);
  const [clients, setClients] = useState<Array<Client>>([]);

  const navigate = useNavigate();
  const tpmClient = useTpmClient();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const initialValues: CreateProject = {
    title: '',
    description: '',
    sourceLanguage: '',
    targetLanguages: [],
    accuracyId: '',
    industryId: '',
    unitId: '',
    serviceTypeIds: [],
    amount: 0,
    expectedStart: new Date(),
    internalDeadline: new Date(),
    externalDeadline: new Date(),
    budget: 0,
    currencyCode: '',
    clientId: ''
  };

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
    expectedStart: date().required('Expected start date is required'),
    internalDeadline: date().required('Internal deadline is required'),
    externalDeadline: date().required('External deadline is required'),
    budget: number().required('Budget is required')
      .min(0, 'Budget must be greater than or equal to 0'),
    currencyCode: string().required('Currency is required'),
    clientId: string().required('Client is required')
  });

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Projects', path: '/projects' },
      { label: 'Create Project', path: '/projects/create' }
    ]);

    forkJoin({
      accuracies: tpmClient.accuracies().all(),
      industries: tpmClient.industries().all(),
      units: tpmClient.units().all(),
      serviceTypes: tpmClient.serviceTypes().all(),
      clients: tpmClient.clients().all()
    }).subscribe({
      next: (response) => {
        const { accuracies, industries, units, serviceTypes, clients } = response;

        setAccuracies(accuracies.items);
        setIndustries(industries.items);
        setUnits(units.items);
        setServiceTypes(serviceTypes.items);
        setClients(clients.items);
      },
      error: (error) => {
        snackbarContext.showError('Error loading reference data', error.message);
      }
    });
  }, []);

  const handleSubmit = async (values: CreateProject) =>
    tpmClient.projects()
      .create(values)
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

  return (
    <Box>
      <Typography variant="h4">Create Project</Typography>
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
              <Grid item xs={4}>
                <DateTimeField name="expectedStart" label="Expected Start" required/>
              </Grid>
              <Grid item xs={4}>
                <DateTimeField name="internalDeadline" label="Internal Deadline" required/>
              </Grid>
              <Grid item xs={4}>
                <DateTimeField name="externalDeadline" label="External Deadline" required/>
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
                />
              </Grid>
              <Grid item xs={12}>
                <SelectField name="serviceTypeIds" label="Service Types" required multiple
                  options={serviceTypes.map((serviceType) => ({ key: serviceType.id, value: serviceType.name }))}
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
  );
};
