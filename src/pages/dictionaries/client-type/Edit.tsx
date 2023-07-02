import { useState, useEffect, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { BooleanField } from "../../../components/form-controls/BooleanField";
import { useNavigate, useParams, } from "react-router-dom";
import { UpdateClientType } from "../../../client/types/client/ClientType";
import TpmClient from "../../../client/TpmClient";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";

export const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [clientType, setClientType] = useState<UpdateClientType>({
    name: '',
    description: '',
    corporate: false
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    if (!id) return;

    TpmClient.getInstance()
      .clientTypes()
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
        error: (error) => setServerError(error)
      });
  }, [id]);

  const handleSubmit = (values: UpdateClientType) => {
    if (!id) return;

    TpmClient.getInstance()
      .clientTypes()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => navigate("/client-types"),
        error: (error) => setServerError(error)
      });
  }
    
  return (
    <Box>
      <Typography variant="h4">Edit {clientType.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
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
