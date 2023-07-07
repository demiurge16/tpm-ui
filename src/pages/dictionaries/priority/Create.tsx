import { useContext, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../../components/form-controls/TextField";
import TpmClient from "../../../client/TpmClient";
import { CreatePriority } from "../../../client/types/dictionaries/Priority";
import { NumberField } from "../../../components/form-controls/NumberField";
import { EmojiPickerField } from "../../../components/form-controls/EmojiPickerField";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const snackbarContext = useContext(SnackbarContext);

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: "Priority", path: "/priorities" },
      { label: "Create", path: "/priorities/create" },
    ]);
  }, []);

  const handleSubmit = (data: CreatePriority) => 
    TpmClient.getInstance()
      .priorities()
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

  return (
    <Box>
      <Typography variant="h4">Create new priority</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={{ name: '', description: '', value: 0, emoji: '' }}
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
