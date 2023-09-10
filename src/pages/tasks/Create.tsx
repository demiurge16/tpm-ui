import { useContext, useEffect, useState } from 'react';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { BreadcrumbsContext } from '../../contexts/BreadcrumbsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { forkJoin, map } from 'rxjs';
import { Accuracy } from '../../client/types/dictionaries/Accuracy';
import { Industry } from '../../client/types/dictionaries/Industry';
import { Unit } from '../../client/types/dictionaries/Unit';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { TextField } from '../../components/form-controls/TextField';
import { SelectField } from '../../components/form-controls/SelectField';
import { NumberField } from '../../components/form-controls/NumberField';
import { DateTimeField } from '../../components/form-controls/DateTimeField';
import { object, string, number, date } from 'yup';
import { AsyncSelectField } from '../../components/form-controls/AsyncSelectField';
import { CreateTask } from '../../client/types/project/Task';
import { Priority } from '../../client/types/dictionaries/Priority';
import { validateWithSchema } from '../../utils/validate';
import { useTpmClient } from '../../contexts/TpmClientContext';
import { LoadingScreen } from '../utils/LoadingScreen';
import { ServiceType } from '../../client/types/project/Project';

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [accuracies, setAccuracies] = useState<Array<Accuracy>>([]);
  const [industries, setIndustries] = useState<Array<Industry>>([]);
  const [units, setUnits] = useState<Array<Unit>>([]);
  const [priorities, setPriorities] = useState<Array<Priority>>([]);
  const [serviceTypes, setServiceTypes] = useState<Array<ServiceType>>([]);

  const navigate = useNavigate();
  const tpmClient = useTpmClient();
  const { projectId } = useParams();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const initialValues: CreateTask = {
    title: '',
    description: '',
    sourceLanguage: '',
    targetLanguage: '',
    accuracyId: '',
    industryId: '',
    unitId: '',
    amount: 0,
    expectedStart: new Date(),
    deadline: new Date(),
    budget: 0,
    currencyCode: '',
    priorityId: ''
  };

  const validationSchema = object({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    sourceLanguage: string().required('Source language is required'),
    targetLanguage: string().required('Target language is required'),
    accuracyId: string().required('Accuracy is required'),
    industryId: string().required('Industry is required'),
    unitId: string().required('Unit is required'),
    serviceTypeId: string().required('Service type is required'),
    amount: number().required('Amount is required')
      .min(1, 'Amount must be greater than or equal to 1'),
    expectedStart: date().required('Expected start date is required'),
    deadline: date().required('Deadline is required'),
    budget: number().required('Budget is required')
      .min(0, 'Budget must be greater than or equal to 0'),
    currencyCode: string().required('Currency is required'),
    priorityId: string().required('Priority is required')
  });

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Projects', path: '/projects' },
      { label: 'Project', path: `/projects/${projectId}` },
      { label: 'Create Task', path: '/projects/tasks/create' }
    ]);

    forkJoin({
      accuracies: tpmClient.accuracies().all(),
      industries: tpmClient.industries().all(),
      units: tpmClient.units().all(),
      priorities: tpmClient.priorities().all(),
      serviceTypes: tpmClient.serviceTypes().all()
    }).subscribe({
      next: (response) => {
        const { accuracies, industries, units, priorities, serviceTypes } = response;

        setAccuracies(accuracies.items);
        setIndustries(industries.items);
        setUnits(units.items);
        setPriorities(priorities.items);
        setServiceTypes(serviceTypes.items);
        setLoading(false);
      },
      error: (error) => {
        snackbarContext.showError('Error loading reference data', error.message);
      }
    });
  }, []);

  const handleSubmit = async (values: CreateTask) => {
    if (!projectId) {
      return;
    }

    tpmClient
      .projects()
      .withId(projectId)
      .tasks()
      .create(values)
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess('Success', 'Task created');
          navigate(`/tasks/${response.id}`);
        },
        error: (error) => {
          snackbarContext.showError(error.message, error.response.data.message);
          setServerError(error.message);
        }
      });
  };

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4">Create new task</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={initialValues}
        validate={(values) => validateWithSchema(validationSchema, values)}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Task Details</Typography>
              <Grid container columnSpacing={2}>
                <Grid item xs={12}>
                  <TextField name="title" label="Title" required/>
                </Grid>
                <Grid item xs={12}>
                  <TextField name="description" label="Description" multiline rows={4} required/>
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
                  <SelectField name="serviceTypeId" label="Service Type" required
                    options={serviceTypes.map((serviceType) => ({ key: serviceType.id, value: serviceType.name }))}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Language pair</Typography>
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
                  <AsyncSelectField name="targetLanguage" label="Target Language" required
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
              <Typography variant="h6">Time frame</Typography>
              <Grid container columnSpacing={2}>
                <Grid item xs={6}>
                  <DateTimeField name="expectedStart" label="Expected Start" required/>
                </Grid>
                <Grid item xs={6}>
                  <DateTimeField name="deadline" label="Deadline" required/>
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Task size & priority</Typography>
              <Grid container columnSpacing={2}>
                <Grid item xs={6}>
                  <NumberField name="amount" label="Amount" required/>
                </Grid>
                <Grid item xs={6}>              
                  <SelectField name="unitId" label="Unit" required
                    options={units.map((unit) => ({ key: unit.id, value: unit.name }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectField name="priorityId" label="Priority" required
                    options={priorities.map((priority) => ({ key: priority.id, value: priority.name }))}
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
