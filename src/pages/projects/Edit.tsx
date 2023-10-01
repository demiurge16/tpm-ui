import { useNavigate, useParams } from 'react-router-dom';
import { useTpmClient } from '../../contexts/TpmClientContext';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useBreadcrumbsContext } from '../../contexts/BreadcrumbsContext';
import { Project, UpdateProject } from '../../client/types/project/Project';
import { array, number, object, string } from 'yup';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { TextField } from '../../components/form-controls/TextField';
import { SelectField } from '../../components/form-controls/SelectField';
import { AsyncSelectField } from '../../components/form-controls/AsyncSelectField';
import { NumberField } from '../../components/form-controls/NumberField';
import { LoadingScreen } from '../utils/LoadingScreen';
import { useSubmitHandler } from '../../components/form/useSubmitHandler';
import { useValidator } from '../../components/form/useValidator';
import { useRefdata } from '../../components/form/useRefdata';

export const Edit = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error('Project id is required');
  }

  const tpmClient = useTpmClient();

  const { showSuccess } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();

  const { loading, refdata, refdataError } = useRefdata(
    {
      project: tpmClient.projects().withId(id).get(),
      accuracies: tpmClient.accuracies().all(),
      industries: tpmClient.industries().all(),
      units: tpmClient.units().all(),
      serviceTypes: tpmClient.serviceTypes().all(),
      clients: tpmClient.clients().all(),
      languages: tpmClient.languages().all(),
      currencies: tpmClient.currencies().all()
    },
    (result) => setBreadcrumbs([
      { label: 'Projects', path: '/projects' },
      { label: result.project.title, path: `/projects/${result.project.id}` },
      { label: `Edit`, path: `/projects/${result.project.id}/edit` }
    ])
  );

  const { project, accuracies, industries, units, serviceTypes, clients, languages, currencies } = refdata;

  const navigate = useNavigate();
  const { handleSubmit, submitError } = useSubmitHandler<UpdateProject, Project>({
    handleSubmit: (project) => tpmClient.projects().withId(id).update(project),
    successHandler: (project) => {
      showSuccess('Project updated', `Project ${project.title} was updated successfully`);
      navigate(`/projects/${project.id}`);
    }
  });
  const validator = useValidator(
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
      <Typography variant="h4">Edit {project.title}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{
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
        }}
        validate={validator}
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
                    options={industries.items.map((industry) => ({ key: industry.id, value: industry.name }))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SelectField name="accuracyId" label="Accuracy" required
                    options={accuracies.items.map((accuracy) => ({ key: accuracy.id, value: accuracy.name }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectField name="serviceTypeIds" label="Service Types" required multiple
                    options={serviceTypes.items.map((serviceType) => ({ key: serviceType.id, value: serviceType.name }))}
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
                    options={languages.items.map((language) => ({ key: language.code, value: language.name }))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AsyncSelectField name="targetLanguages" label="Target Languages" required multiple
                    options={languages.items.map((language) => ({ key: language.code, value: language.name }))}
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
                    options={units.items.map((unit) => ({ key: unit.id, value: unit.name }))}
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
                    options={
                      currencies.items.map((currency) => (
                        {
                          key: currency.code,
                          value: `${currency.code} - ${currency.name}`
                        }
                      ))
                    }
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
                    options={clients.items.map((client) => ({ key: client.id, value: client.name }))}
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
