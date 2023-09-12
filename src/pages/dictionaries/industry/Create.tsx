import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateIndustry } from "../../../client/types/dictionaries/Industry";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { useTpmClient } from "../../../contexts/TpmClientContext";

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { setBreadcrumbs } = useBreadcrumbsContext();;
  const { showSuccess, showError } = useSnackbarContext();
  const tpmClient = useTpmClient();

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Industries', path: '/industries' },
      { label: 'Create', path: '/industries/create' }
    ]);
  }, [setBreadcrumbs]);

  const handleSubmit = (data: CreateIndustry) =>
    tpmClient.industries()
      .create(data)
      .subscribe({
        next: () => {
          showSuccess("Success", "Industry created");
          navigate("/industries");
        },
        error: (error) => {
          showError("Error creating industry", error.message);
          setServerError(error.message);
        }
      });

  return (
    <Box>
      <Typography variant="h4">Create new industry</Typography>
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
