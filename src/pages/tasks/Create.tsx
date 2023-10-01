import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { TextField } from '../../components/form-controls/TextField';
import { SelectField } from '../../components/form-controls/SelectField';
import { NumberField } from '../../components/form-controls/NumberField';
import { DateTimeField } from '../../components/form-controls/DateTimeField';
import { object, string, number, date } from 'yup';
import { AsyncSelectField } from '../../components/form-controls/AsyncSelectField';
import { CreateTask } from '../../client/types/project/Task';
import { useTpmClient } from '../../contexts/TpmClientContext';
import { LoadingScreen } from '../utils/LoadingScreen';
import { useSubmitHandler } from '../../components/form/useSubmitHandler';
import { Task } from '../../client/types/task/Task';
import { useValidator } from '../../components/form/useValidator';
import { useRefdata } from '../../components/form/useRefdata';
import { useBreadcrumbsContext } from '../../contexts/BreadcrumbsContext';

export const Create = () => {
  const { projectId } = useParams();

  if (!projectId) {
    throw new Error('Project ID is required');
  }

  const { showSuccess } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();

  const navigate = useNavigate();
  const tpmClient = useTpmClient();

  const { loading, refdata, refdataError } = useRefdata(
    {
      accuracies: tpmClient.accuracies().all(),
      industries: tpmClient.industries().all(),
      units: tpmClient.units().all(),
      priorities: tpmClient.priorities().all(),
      serviceTypes: tpmClient.serviceTypes().all(),
      languages: tpmClient.languages().all(),
      currencies: tpmClient.currencies().all(),
      project: tpmClient.projects().withId(projectId).get()
    },
    (result) => {
      setBreadcrumbs([
        { label: 'Projects', path: '/projects' },
        { label: result.project.name, path: `/projects/${result.project.id}` },
        { label: 'Create Task', path: `/projects/${result.project.id}/tasks/create` }
      ]);
    }
  );

  const { accuracies, industries, units, priorities, serviceTypes, languages, currencies } = refdata;

  const { handleSubmit, submitError } = useSubmitHandler<CreateTask, Task>({
    handleSubmit: (values) => tpmClient.projects().withId(projectId).tasks().create(values),
    successHandler: (task) => {
      showSuccess('Success', 'Task created successfully');
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
      expectedStart: date().required('Expected start date is required'),
      deadline: date().required('Deadline is required'),
      budget: number().required('Budget is required')
        .min(0, 'Budget must be greater than or equal to 0'),
      currencyCode: string().required('Currency is required'),
      priorityId: string().required('Priority is required')
    })
  );

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
                    options={industries.items.map((industry) => ({ key: industry.id, value: industry.name }))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SelectField name="accuracyId" label="Accuracy" required
                    options={accuracies.items.map((accuracy) => ({ key: accuracy.id, value: accuracy.name }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectField name="serviceTypeId" label="Service Type" required
                    options={serviceTypes.items.map((serviceType) => ({ key: serviceType.id, value: serviceType.name }))}
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
                    options={languages.items.map((language) => ({ key: language.code, value: language.name }))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AsyncSelectField name="targetLanguage" label="Target Language" required
                    options={languages.items.map((language) => ({ key: language.code, value: language.name }))}
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
                    options={units.items.map((unit) => ({ key: unit.id, value: unit.name }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectField name="priorityId" label="Priority" required
                    options={priorities.items.map((priority) => ({ key: priority.id, value: priority.name }))}
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
                    options={currencies.items.map((currency) => ({ key: currency.code, value: currency.name }))}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />
              
            {(refdataError || submitError) && (
              <>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography color="error">Error: {refdataError || submitError}</Typography>
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
