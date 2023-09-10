import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateAccuracy } from "../../../client/types/dictionaries/Accuracy";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { useTpmClient } from "../../../contexts/TpmClientContext";

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const tpmClient = useTpmClient();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: "Accuracies", path: "/accuracies" },
      { label: "Create", path: "/accuracies/create" },
    ]);
  }, []);

  const handleSubmit = (data: CreateAccuracy) =>
    tpmClient.accuracies()
      .create(data)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess("Success", "Accuracy created");
          navigate("/accuracies");
        },
        error: (error) => {
          snackbarContext.showError("Error creating accuracy", error.message);
          setServerError(error.message);
        }
      });

  return (
    <Box>
      <Typography variant="h4">Create new accuracy</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{ name: '', description: '' }}
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
