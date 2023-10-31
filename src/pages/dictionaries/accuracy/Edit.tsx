import { useEffect, useState } from "react";
import { UpdateAccuracy } from "../../../client/types/dictionaries/Accuracy";
import { useNavigate, useParams } from "react-router-dom";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { LoadingScreen } from "../../utils/LoadingScreen";
import { applicationClient } from "../../../client/ApplicationClient";

const Edit = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState<UpdateAccuracy>({
    name: '',
    description: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const { setBreadcrumbs } = useBreadcrumbsContext();
  const { showSuccess, showError } = useSnackbarContext();

  useEffect(() => {
    if (!id) return;

    applicationClient.accuracies()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setAccuracy(response);
          setBreadcrumbs([
            { label: 'Accuracy', path: '/accuracy' },
            { label: response.name, path: `/accuracy/${response.id}` },
            { label: 'Edit', path: `/accuracy/${response.id}/edit` }
          ]);
          setLoading(false);
        },
        error: (error) => {
          showError("Error loading accuracy", error.message);
          setServerError(error.message);
        }
      });
  }, [id, setBreadcrumbs, showError, applicationClient]);

  const handleSubmit = (values: UpdateAccuracy) => {
    if (!id) return;

    applicationClient.accuracies()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => {
          showSuccess("Success", "Accuracy updated");
          navigate("/accuracies");
        },
        error: (error) => {
          showError("Error updating accuracy", error.message);
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
      <Typography variant="h4">Edit {accuracy.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{ name: accuracy.name, description: accuracy.description }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper elevation={2} sx={{ p: 2 }}>
              <TextField name="name" label="Name" required />
              <TextField name="description" label="Description" multiline rows={4} required />
            </Paper>

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
