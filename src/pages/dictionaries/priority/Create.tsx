import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../../components/form-controls/TextField";
import TpmClient from "../../../client/TpmClient";
import { CreatePriority } from "../../../client/types/dictionaries/Priority";
import { NumberField } from "../../../components/form-controls/NumberField";

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (data: CreatePriority) =>
    TpmClient.getInstance()
      .priorities()
      .create(data)
      .subscribe({
        next: () => navigate("/priorities"),
        error: (error) => setServerError(error.message),
      });

  return (
    <Box>
      <Typography variant="h4">Create new priority</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={{ name: '', description: '', corporate: false }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate> 
            <TextField name="name" label="Name" required />
            <TextField name="description" label="Description" multiline rows={4} required />
            <NumberField name="value" label="Value" required />
            <TextField name="emoji" label="Emoji" required />

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
