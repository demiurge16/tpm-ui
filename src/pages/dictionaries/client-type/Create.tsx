import { useEffect, useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { BooleanField } from "../../../components/form-controls/BooleanField";
import { useNavigate } from "react-router-dom";
import { CreateClientType } from "../../../client/types/client/ClientType";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { applicationClient } from "../../../client/ApplicationClient";

const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Client types', path: '/client-types' },
      { label: 'Create', path: '/client-types/create' }
    ]);
  }, [setBreadcrumbs]);

  const handleSubmit = async (values: CreateClientType) =>
    applicationClient.clientTypes()
      .create(values)
      .subscribe({
        next: () => {
          showSuccess('Success', 'Client type created');
          navigate("/client-types");
        },
        error: (error) => {
          showError('Error creating client type', error.message);
          setServerError(error.message);
        }
      });

  return (
    <Box>
      <Typography variant="h4">Create new client type</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{ name: '', description: '', corporate: false }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Client type details</Typography>
              <TextField name="name" label="Name" required />
              <TextField name="description" label="Description" multiline rows={4} required />
              <BooleanField name="corporate" label="Corporate" required />
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
}

export default Create;
