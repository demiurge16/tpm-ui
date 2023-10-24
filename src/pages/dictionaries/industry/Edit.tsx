import { useEffect, useState } from 'react';
import { UpdateIndustry } from '../../../client/types/dictionaries/Industry';
import { useNavigate, useParams } from 'react-router-dom';
import { useBreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { useSnackbarContext } from '../../../contexts/SnackbarContext';
import { LoadingScreen } from '../../utils/LoadingScreen';
import { applicationClient } from '../../../client/ApplicationClient';

export const Edit = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [industry, setIndustry] = useState<UpdateIndustry>({
    name: '',
    description: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const {  setBreadcrumbs } = useBreadcrumbsContext();
  const { showSuccess, showError } = useSnackbarContext();

  useEffect(() => {
    if (!id) return;

    applicationClient.industries()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setIndustry(response);
          setBreadcrumbs([
            { label: 'Industry', path: '/industry' },
            { label: response.name, path: `/industry/${response.id}` },
            { label: 'Edit', path: `/industry/${response.id}/edit` }
          ]);
          setLoading(false);
        },
        error: (error) => {
          showError("Error loading industry", error.message);
          setServerError(error.message);
        }
      });
  }, [id, setBreadcrumbs, showError, applicationClient]);

  const handleSubmit = (values: UpdateIndustry) => {
    if (!id) return;

    applicationClient.industries()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => {
          showSuccess('Success', 'Industry updated');
          navigate('/industries')
        },
        error: (error) => {
          showError("Error updating industry", error.message);
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
      <Typography variant="h4">Edit {industry.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{ name: industry.name, description: industry.description }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper elevation={2} sx={{ p: 2 }}>
              <TextField name="name" label="Name" required />
              <TextField name="description" label="Description" multiline rows={4} required />
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
