import { useContext, useEffect, useState } from 'react';
import { Accuracy } from '../../client/types/dictionaries/Accuracy';
import { Industry } from '../../client/types/dictionaries/Industry';
import { Unit } from '../../client/types/dictionaries/Unit';
import { Priority } from '../../client/types/dictionaries/Priority';
import { ServiceType } from '../../client/types/dictionaries/ServiceType';
import { useNavigate, useParams } from 'react-router-dom';
import { useTpmClient } from '../../contexts/TpmClientContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { BreadcrumbsContext } from '../../contexts/BreadcrumbsContext';
import { Task, UpdateTask } from '../../client/types/task/Task';
import {  number, object, string } from 'yup';
import { forkJoin } from 'rxjs';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { LoadingScreen } from '../utils/LoadingScreen';
import { Form } from 'react-final-form';
import { validateWithSchema } from '../../utils/validate';
import { TextField } from '../../components/form-controls/TextField';
import { SelectField } from '../../components/form-controls/SelectField';
import { AsyncSelectField } from '../../components/form-controls/AsyncSelectField';
import { NumberField } from '../../components/form-controls/NumberField';

export const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [task, setTask] = useState<Task>({} as Task);
  const [accuracies, setAccuracies] = useState<Array<Accuracy>>([]);
  const [industries, setIndustries] = useState<Array<Industry>>([]);
  const [units, setUnits] = useState<Array<Unit>>([]);
  const [serviceTypes, setServiceTypes] = useState<Array<ServiceType>>([]);

  const navigate = useNavigate();
  const tpmClient = useTpmClient();
  const { id } = useParams();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const [initialValues, setInitialValues] = useState<UpdateTask>({
    title: '',
    description: '',
    sourceLanguage: '',
    targetLanguage: '',
    accuracyId: '',
    industryId: '',
    unitId: '',
    serviceTypeId: '',
    amount: 0,
    budget: 0,
    currencyCode: ''
  });

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
    budget: number().required('Budget is required')
      .min(0, 'Budget must be greater than or equal to 0'),
    currencyCode: string().required('Currency is required')
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    forkJoin({
      task: tpmClient.tasks().withId(id).get(),
      accuracies: tpmClient.accuracies().all(),
      industries: tpmClient.industries().all(),
      units: tpmClient.units().all(),
      serviceTypes: tpmClient.serviceTypes().all()
    }).subscribe({
      next: (response) => {
        const { task, accuracies, industries, units, serviceTypes } = response;

        setTask(task);
        setInitialValues({
          title: task.title,
          description: task.description,
          sourceLanguage: task.sourceLanguage.code,
          targetLanguage: task.targetLanguage.code,
          accuracyId: task.accuracy.id,
          industryId: task.industry.id,
          unitId: task.unit.id,
          serviceTypeId: task.serviceType.id,
          amount: task.amount,
          budget: task.budget,
          currencyCode: task.currency.code
        });
        setAccuracies(accuracies.items);
        setIndustries(industries.items);
        setUnits(units.items);
        setServiceTypes(serviceTypes.items);
        setLoading(false);

        breadcrumbsContext.setBreadcrumbs([
          { label: 'Tasks', path: '/tasks' },
          { label: task.title, path: `/tasks/${task.id}` },
          { label: 'Edit', path: `/tasks/${task.id}/edit` }
        ]);
      },
      error: (error) => {
        snackbarContext.showError('Error loading reference data', error.message);
      }
    });
  }, []);

  const handleSubmit = async (values: UpdateTask) => {
    if (!id) {
      return;
    }

    tpmClient.tasks()
      .withId(id)
      .update(values)
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess('Success', 'Task updated successfully');
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
      <Typography variant="h4">Edit {task.title}</Typography>
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
                    defaultValue={{ key: task.sourceLanguage.code, value: task.sourceLanguage.name }}
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
                    defaultValue={{ key: task.targetLanguage.code, value: task.targetLanguage.name }}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Task size</Typography>
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
