import { useContext, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { BooleanField } from "../../../components/form-controls/BooleanField";
import { useNavigate } from "react-router-dom";
import TpmClient from "../../../client/TpmClient";
import { CreateClientType } from "../../../client/types/client/ClientType";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";


export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Client types', path: '/client-types' },
      { label: 'Create', path: '/client-types/create' }
    ]);
  }, []);

  const handleSubmit = async (values: CreateClientType) =>
    TpmClient.getInstance()
      .clientTypes()
      .create(values)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess('Success', 'Client type created');
          navigate("/client-types");
        },
        error: (error) => {
          snackbarContext.showError('Error creating client type', error.message);
          setServerError(error.message);
        }
      });

  return (
    <Box>
      <Typography variant="h4">Create new client type</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={{ name: '', description: '', corporate: false }}
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
