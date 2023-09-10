import { useContext, useEffect, useState } from "react";
import { UpdateAccuracy } from "../../../client/types/dictionaries/Accuracy";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { useTpmClient } from "../../../contexts/TpmClientContext";
import { LoadingScreen } from "../../utils/LoadingScreen";

export const Edit = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState<UpdateAccuracy>({
    name: '',
    description: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const tpmClient = useTpmClient();

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const snackbarContext = useContext(SnackbarContext);

  useEffect(() => {
    if (!id) return;

    tpmClient.accuracies()
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
          setLoading(false);
        },
        error: (error) => {
          snackbarContext.showError("Error loading accuracy", error.message);
          setServerError(error.message);
        }
      });
  }, [id]);

  const handleSubmit = (values: UpdateAccuracy) => {
    if (!id) return;

    tpmClient.accuracies()
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
