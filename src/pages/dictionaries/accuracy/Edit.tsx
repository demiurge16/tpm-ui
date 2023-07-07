import { useContext, useEffect, useState } from "react";
import { UpdateAccuracy } from "../../../client/types/dictionaries/Accuracy";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import TpmClient from "../../../client/TpmClient";
import { Box, Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { SnackbarContext } from "../../../contexts/SnackbarContext";

export const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState<UpdateAccuracy>({
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
      .accuracies()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setAccuracy(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Accuracy', path: '/accuracy' },
            { label: response.name, path: `/accuracy/${response.id}` },
            { label: 'Edit', path: `/accuracy/${response.id}/edit` }
          ]);
        },
        error: (error) => {
          snackbarContext.showError("Error loading accuracy", error.message);
          setServerError(error.message);
        }
      });
  }, [id]);

  const handleSubmit = (values: UpdateAccuracy) => {
    if (!id) return;

    TpmClient.getInstance()
      .accuracies()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess("Success", "Accuracy updated");
          navigate("/accuracies");
        },
        error: (error) => {
          snackbarContext.showError("Error updating accuracy", error.message);
          setServerError(error.message);
        }
      });
  }

  return (
    <Box>
      <Typography variant="h4">Edit {accuracy.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={{ name: accuracy.name, description: accuracy.description }}
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
