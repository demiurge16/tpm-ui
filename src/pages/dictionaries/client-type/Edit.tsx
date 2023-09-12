import { useState, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { BooleanField } from "../../../components/form-controls/BooleanField";
import { useNavigate, useParams, } from "react-router-dom";
import { UpdateClientType } from "../../../client/types/client/ClientType";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { useTpmClient } from "../../../contexts/TpmClientContext";
import { LoadingScreen } from "../../utils/LoadingScreen";

export const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [clientType, setClientType] = useState<UpdateClientType>({
    name: '',
    description: '',
    corporate: false
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const tpmClient = useTpmClient();

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();;

  useEffect(() => {
    if (!id) return;

    tpmClient.clientTypes()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setClientType(response);
          setBreadcrumbs([
            { label: 'Client types', path: '/client-types' },
            { label: response.name, path: `/client-types/${response.id}` },
            { label: 'Edit', path: `/client-types/${response.id}/edit` }
          ]);
          setLoading(false);
        },
        error: (error) => {
          showError("Error loading client type", error.message);
          setServerError(error.message);
        }
      });
  }, [id, setBreadcrumbs, showError, tpmClient]);

  const handleSubmit = (values: UpdateClientType) => {
    if (!id) return;

    tpmClient.clientTypes()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => {
          showSuccess("Success", "Client type updated");
          navigate("/client-types");
        },
        error: (error) => {
          showError("Error updating client type", error.message);
          setServerError(error.message);
        }
      });
  }
    
  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4">Edit {clientType.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{ name: clientType.name, description: clientType.description, corporate: clientType.corporate }}
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
