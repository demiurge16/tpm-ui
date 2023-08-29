import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import TpmClient from "../../../client/TpmClient";
import { Box, Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { NumberField } from "../../../components/form-controls/NumberField";
import { EmojiPickerField } from "../../../components/form-controls/EmojiPickerField";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { UpdateServiceType } from "../../../client/types/dictionaries/ServiceType";

export const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [priority, setPriority] = useState<UpdateServiceType>({
    name: '',
    description: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const snackbarContext = useContext(SnackbarContext);

  useEffect(() => {
    if (!id) return;

    TpmClient.getInstance()
      .serviceTypes()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setPriority(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Service type', path: '/service-types' },
            { label: response.name, path: `/service-types/${response.id}` },
            { label: 'Edit', path: `/service-types/${response.id}/edit` }
          ]);
        },
        error: (error) => {
          snackbarContext.showError(`Error loading priority ${id}`, error.message);
          setServerError(error.message);
        }
      });
  }, [id]);

  const handleSubmit = (values: UpdateServiceType) => {
    if (!id) return;

    TpmClient.getInstance()
      .serviceTypes()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess('Success', 'Service type updated');
          navigate('/service-types');
        },
        error: (error) => {
          snackbarContext.showError("Error updating service type", error.message);
          setServerError(error);
        }
      });
  };

  return (
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
            <TextField name="name" label="Name" required />
            <TextField name="description" label="Description" multiline rows={4} required />

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
};
