import { useContext, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../../components/form-controls/TextField";
import { CreatePriority } from "../../../client/types/dictionaries/Priority";
import { NumberField } from "../../../components/form-controls/NumberField";
import { EmojiPickerField } from "../../../components/form-controls/EmojiPickerField";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { number, object, string } from "yup";
import { validateWithSchema } from "../../../utils/validate";
import { useTpmClient } from "../../../contexts/TpmClientContext";

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const snackbarContext = useContext(SnackbarContext);
  const tpmClient = useTpmClient();

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: "Priority", path: "/priorities" },
      { label: "Create", path: "/priorities/create" },
    ]);
  }, []);

  const handleSubmit = (data: CreatePriority) => 
    tpmClient.priorities()
      .create(data)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess("Success", "Priority created");
          navigate("/priorities");
        },
        error: (error) => {
          snackbarContext.showError("Error creating priority", error.message);
          setServerError(error.message);
        }
      });

  const validationSchema = object({
    name: string().required("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be at most 50 characters long"),
    description: string().required("Description is required")
      .min(3, "Description must be at least 3 characters long")
      .max(1000, "Description must be at most 1000 characters long"),
    value: number().required("Value is required")
      .integer("Value must be an integer")
      .min(0, "Value must be at least 0")
      .max(1000000, "Value must be at most 1000000"),
    emoji: string().required("Emoji is required")
  });

  return (
    <Box>
      <Typography variant="h4">Create new priority</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{ name: '', description: '', value: 0, emoji: '' }}
        validate={(values) => validateWithSchema(validationSchema, values)}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper elevation={2} sx={{ p: 2 }}>
              <TextField name="name" label="Name" required />
              <TextField name="description" label="Description" multiline rows={4} required />
              <NumberField name="value" label="Value" required />
              <EmojiPickerField name="emoji" label="Emoji" required />
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
