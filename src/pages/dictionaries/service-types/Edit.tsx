import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { UpdateServiceType } from "../../../client/types/dictionaries/ServiceType";
import { applicationClient } from "../../../client/ApplicationClient";
import { LoadingScreen } from "../../utils/LoadingScreen";

const Edit = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [priority, setPriority] = useState<UpdateServiceType>({
    name: '',
    description: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const { setBreadcrumbs } = useBreadcrumbsContext();
  const { showSuccess, showError } = useSnackbarContext();

  useEffect(() => {
    if (!id) return;

    applicationClient.serviceTypes()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setPriority(response);
          setBreadcrumbs([
            { label: 'Service type', path: '/service-types' },
            { label: response.name, path: `/service-types/${response.id}` },
            { label: 'Edit', path: `/service-types/${response.id}/edit` }
          ]);
          setLoading(false);
        },
        error: (error) => {
          showError(`Error loading priority ${id}`, error.message);
          setServerError(error.message);
        }
      });
  }, [id, setBreadcrumbs, showError, applicationClient]);

  const handleSubmit = (values: UpdateServiceType) => {
    if (!id) return;

    applicationClient.serviceTypes()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => {
          showSuccess('Success', 'Service type updated');
          navigate('/service-types');
        },
        error: (error) => {
          showError("Error updating service type", error.message);
          setServerError(error);
        }
      });
  };

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4">Edit {priority.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{
          name: priority.name,
          description: priority.description
        }}
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

export default Edit;
