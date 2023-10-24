import { Box, Button, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../../components/form-controls/TextField";
import { CreatePriority } from "../../../client/types/dictionaries/Priority";
import { NumberField } from "../../../components/form-controls/NumberField";
import { EmojiPickerField } from "../../../components/form-controls/EmojiPickerField";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { number, object, string } from "yup";
import { applicationClient } from "../../../client/ApplicationClient";
import { useSubmitHandler } from "../../../components/form/useSubmitHandler";
import { Priority } from "../../../client/types/task/Task";
import { useValidator } from "../../../components/form/useValidator";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { useRefdata } from "../../../components/form/useRefdata";

export const Create = () => {
  const navigate = useNavigate();

  const { setBreadcrumbs } = useBreadcrumbsContext();

  useRefdata(
    {},
    () => setBreadcrumbs([
      { label: "Priorities", path: "/priorities" },
      { label: "Create", path: "/priorities/create" },
    ])
  );

  const { showSuccess } = useSnackbarContext();
  const { handleSubmit, submitError } = useSubmitHandler<CreatePriority, Priority>({
    handleSubmit: (values) => applicationClient.priorities().create(values),
    successHandler: (priority) => {
      showSuccess("Success", "Priority created successfully");
      navigate(`/priorities/${priority.id}`);
    },
  });

  const validator = useValidator( 
    object({
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
    })
  );

  return (
    <Box>
      <Typography variant="h4">Create new priority</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{ name: '', description: '', value: 0, emoji: '' }}
        validate={validator}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper elevation={2} sx={{ p: 2 }}>
              <TextField name="name" label="Name" required />
              <TextField name="description" label="Description" multiline rows={4} required />
              <NumberField name="value" label="Value" required />
              <EmojiPickerField name="emoji" label="Emoji" required />
            </Paper>
            <Box pb={2} />

            {submitError && (
              <>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography color="error">Error: {submitError}</Typography>
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
