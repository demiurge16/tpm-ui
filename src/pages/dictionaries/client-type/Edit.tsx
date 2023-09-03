import { useState, useEffect, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { BooleanField } from "../../../components/form-controls/BooleanField";
import { useNavigate, useParams, } from "react-router-dom";
import { UpdateClientType } from "../../../client/types/client/ClientType";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { useTpmClient } from "../../../contexts/TpmClientContext";

export const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [clientType, setClientType] = useState<UpdateClientType>({
    name: '',
    description: '',
    corporate: false
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const tpmClient = useTpmClient();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    if (!id) return;

    tpmClient.clientTypes()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setClientType(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Client types', path: '/client-types' },
            { label: response.name, path: `/client-types/${response.id}` },
            { label: 'Edit', path: `/client-types/${response.id}/edit` }
          ]);
        },
        error: (error) => {
          snackbarContext.showError("Error loading client type", error.message);
          setServerError(error.message);
        }
      });
  }, [id]);

  const handleSubmit = (values: UpdateClientType) => {
    if (!id) return;

    tpmClient.clientTypes()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess("Success", "Client type updated");
          navigate("/client-types");
        },
        error: (error) => {
          snackbarContext.showError("Error updating client type", error.message);
          setServerError(error.message);
        }
      });
  }
    
  return (
    <Box>
      <Typography variant="h4">Edit {clientType.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{ name: clientType.name, description: clientType.description, corporate: clientType.corporate }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField name="name" label="Name" required />
            <TextField name="description" label="Description" multiline rows={4} required />
            <BooleanField name="corporate" label="Corporate" required />

            <Box pb={2} />
            {serverError && (
              <Typography color="error">Error: {serverError}</Typography>
            )}
            <Box pb={2} />

            <Button type="submit" disabled={submitting || pristine}>
              Submit
            </Button>
            <Button type="button" disabled={submitting || pristine} onClick={() => form.reset()}>
              Reset
            </Button>
          </form>
        )}
      />
    </Box>
  );
}
