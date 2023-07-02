import { useContext, useEffect, useState } from "react";
import { UpdatePriority } from "../../../client/types/dictionaries/Priority";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import TpmClient from "../../../client/TpmClient";
import { Box, Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { NumberField } from "../../../components/form-controls/NumberField";
import { EmojiPickerField } from "../../../components/form-controls/EmojiPickerField";

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
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    if (!id) return;

    TpmClient.getInstance()
      .priorities()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setPriority(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Priority', path: '/priority' },
            { label: response.name, path: `/priority/${response.id}` },
            { label: 'Edit', path: `/priority/${response.id}/edit` }
          ]);
        },
        error: (error) => setServerError(error)
      });
  }, [id]);

  const handleSubmit = (values: UpdatePriority) => {
    if (!id) return;

    TpmClient.getInstance()
      .priorities()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => navigate('/priorities'),
        error: (error) => setServerError(error)
      });
  };

  return (
    <Box>
      <Typography variant="h4">Edit {priority.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
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
