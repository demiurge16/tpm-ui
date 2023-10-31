import { useEffect, useState } from 'react';
import { Accuracy } from '../../client/types/dictionaries/Accuracy';
import { Industry } from '../../client/types/dictionaries/Industry';
import { Unit } from '../../client/types/dictionaries/Unit';
import { ServiceType } from '../../client/types/dictionaries/ServiceType';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useBreadcrumbsContext } from '../../contexts/BreadcrumbsContext';
import { Task, UpdateTask } from '../../client/types/task/Task';
import {  number, object, string } from 'yup';
import { forkJoin } from 'rxjs';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { LoadingScreen } from '../utils/LoadingScreen';
import { Form } from 'react-final-form';
import { TextField } from '../../components/form-controls/TextField';
import { SelectField } from '../../components/form-controls/SelectField';
import { AsyncSelectField } from '../../components/form-controls/AsyncSelectField';
import { NumberField } from '../../components/form-controls/NumberField';
import { Language } from '../../client/types/dictionaries/Language';
import { Currency } from '../../client/types/project/Project';
import { useSubmitHandler } from '../../components/form/useSubmitHandler';
import { useValidator } from '../../components/form/useValidator';
import { applicationClient } from '../../client/ApplicationClient';

const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [task, setTask] = useState<Task>({} as Task);
  const [accuracies, setAccuracies] = useState<Array<Accuracy>>([]);
  const [industries, setIndustries] = useState<Array<Industry>>([]);
  const [units, setUnits] = useState<Array<Unit>>([]);
  const [serviceTypes, setServiceTypes] = useState<Array<ServiceType>>([]);
  const [languages, setLanguages] = useState<Array<Language>>([]);
  const [currencies, setCurrencies] = useState<Array<Currency>>([]);

  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    throw new Error('Task ID is required');
  }

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();

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

  useEffect(() => {
    forkJoin({
      task: applicationClient.tasks().withId(id).get(),
      accuracies: applicationClient.accuracies().all(),
      industries: applicationClient.industries().all(),
      units: applicationClient.units().all(),
      serviceTypes: applicationClient.serviceTypes().all(),
      languages: applicationClient.languages().all(),
      currencies: applicationClient.currencies().all()
    }).subscribe({
      next: (response) => {
        const { task, accuracies, industries, units, serviceTypes, languages, currencies } = response;

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
        setLanguages(languages.items);
        setCurrencies(currencies.items);
        setLoading(false);

        setBreadcrumbs([
          { label: 'Tasks', path: '/tasks' },
          { label: task.title, path: `/tasks/${task.id}` },
          { label: 'Edit', path: `/tasks/${task.id}/edit` }
        ]);
      },
      error: (error) => {
        setServerError(error.message);
        showError('Error loading reference data', error.message);
      }
    });
  }, [id, setBreadcrumbs, showError, applicationClient]);

  const { handleSubmit, submitError } = useSubmitHandler<UpdateTask, Task>({
    handleSubmit: (values) => applicationClient.tasks().withId(id).update(values),
    successHandler: (task) => {
      showSuccess('Success', 'Task updated successfully');
      navigate(`/tasks/${task.id}`);
    },
  });
  const validator = useValidator(
    object({
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
    })
  );

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
        validate={validator}
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
                    options={languages.map((language) => ({ key: language.code, value: language.name }))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AsyncSelectField name="targetLanguage" label="Target Language" required
                    options={languages.map((language) => ({ key: language.code, value: language.name }))}
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
                    options={currencies.map((currency) => ({ key: currency.code, value: currency.name }))}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />
              
            {(serverError || submitError) && (
              <>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography color="error">Error: {(serverError || submitError)}</Typography>
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

export default Edit;
