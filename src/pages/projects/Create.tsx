import { CreateProject, Project } from "../../client/types/project/Project";
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { TextField } from '../../components/form-controls/TextField';
import { SelectField } from '../../components/form-controls/SelectField';
import { NumberField } from '../../components/form-controls/NumberField';
import { DateTimeField } from '../../components/form-controls/DateTimeField';
import { object, string, array, number, date } from 'yup';
import { AsyncSelectField } from '../../components/form-controls/AsyncSelectField';
import { LoadingScreen } from '../utils/LoadingScreen';
import { useSubmitHandler } from '../../components/form/useSubmitHandler';
import { useData } from '../../components/form/useData';
import { useValidator } from '../../components/form/useValidator';
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { useTranslation } from "react-i18next";
import { applicationClient } from "../../client/ApplicationClient";

const Create = () => {
  const navigate = useNavigate();

  const { showSuccess } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();
  const { t } = useTranslation();

  const { loading, data, loadingError } = useData(
    {
      accuracies: applicationClient.accuracies().all(),
      industries: applicationClient.industries().all(),
      units: applicationClient.units().all(),
      serviceTypes: applicationClient.serviceTypes().all(),
      clients: applicationClient.clients().all(),
      currencies: applicationClient.currencies().all(),
      languages: applicationClient.languages().all()
    },
    () => setBreadcrumbs([
      { 
        label: t('projects.create.breadcrumbs.index'),
        path: "/projects"
      },
      { 
        label: t('projects.create.breadcrumbs.create'),
        path: "/projects/create"
      }
    ])
  );

  const { handleSubmit, submitError } = useSubmitHandler<CreateProject, Project>({
    handleSubmit: (values) => applicationClient.projects().create(values),
    successHandler: (result) => {
      showSuccess('Success', 'Project created successfully');
      navigate(`/projects/${result.id}`);
    }
  });

  const validate = useValidator(
    object({
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
    })
  );

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen /> 
    </Paper>
  ) : (
    <Box>
      {/* <Typography variant="h4">Create Project</Typography> */}
      <Typography variant="h4">{t('projects.create.title')}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        validate={validate}
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
                    options={data.industries.items.map((industry) => ({ key: industry.id, value: industry.name }))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SelectField name="accuracyId" label="Accuracy" required
                    options={data.accuracies.items.map((accuracy) => ({ key: accuracy.id, value: accuracy.name }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectField name="serviceTypeIds" label="Service Types" required multiple
                    options={data.serviceTypes.items.map((serviceType) => ({ key: serviceType.id, value: serviceType.name }))}
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
                    options={data.languages.items.map((language) => ({ key: language.code, value: language.name }))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AsyncSelectField name="targetLanguages" label="Target Languages" required multiple
                    options={data.languages.items.map((language) => ({ key: language.code, value: language.name }))}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Time frame</Typography>
              <Grid container columnSpacing={2}>
                <Grid item xs={4}>
                  <DateTimeField name="expectedStart" label="Expected Start" required/>
                </Grid>
                <Grid item xs={4}>
                  <DateTimeField name="internalDeadline" label="Internal Deadline" required/>
                </Grid>
                <Grid item xs={4}>
                  <DateTimeField name="externalDeadline" label="External Deadline" required/>
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
                    options={data.units.items.map((unit) => ({ key: unit.id, value: unit.name }))}
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
                    options={data.currencies.items.map((currency) => ({ key: currency.code, value: currency.name }))}
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
                    options={data.clients.items.map((client) => ({ key: client.id, value: client.name }))}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />

            {(loadingError || submitError) && (
              <>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography color="error">Error: {(loadingError || submitError)}</Typography>
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

export default Create;
