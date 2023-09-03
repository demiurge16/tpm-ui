import { useContext, useEffect, useState } from "react";
import { UpdatePriority } from "../../../client/types/dictionaries/Priority";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Box, Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { NumberField } from "../../../components/form-controls/NumberField";
import { EmojiPickerField } from "../../../components/form-controls/EmojiPickerField";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { useTpmClient } from "../../../contexts/TpmClientContext";

export const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [priority, setPriority] = useState<UpdatePriority>({
    name: '',
    description: '',
    value: 0,
    emoji: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const tpmClient = useTpmClient();

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const snackbarContext = useContext(SnackbarContext);

  useEffect(() => {
    if (!id) return;

    tpmClient.priorities()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setPriority(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Priority', path: '/priorities' },
            { label: response.name, path: `/priorities/${response.id}` },
            { label: 'Edit', path: `/priorities/${response.id}/edit` }
          ]);
        },
        error: (error) => {
          snackbarContext.showError(`Error loading priority ${id}`, error.message);
          setServerError(error.message);
        }
      });
  }, [id]);

  const handleSubmit = (values: UpdatePriority) => {
    if (!id) return;

    tpmClient.priorities()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess('Success', 'Priority updated');
          navigate('/priorities');
        },
        error: (error) => {
          snackbarContext.showError("Error updating priority", error.message);
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
          description: priority.description,
          value: priority.value,
          emoji: priority.emoji
        }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField name="name" label="Name" required />
            <TextField name="description" label="Description" multiline rows={4} required />
            <NumberField name="value" label="Value" required />
            <EmojiPickerField name="emoji" label="Emoji" required />

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
