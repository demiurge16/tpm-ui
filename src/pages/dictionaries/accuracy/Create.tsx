import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateAccuracy } from "../../../client/types/dictionaries/Accuracy";
import TpmClient from "../../../client/TpmClient";
import { Box, Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (data: CreateAccuracy) =>
    TpmClient.getInstance()
      .accuracies()
      .create(data)
      .subscribe({
        next: () => navigate("/accuracies"),
        error: (error) => setServerError(error.message),
      });


  return (
    <Box>
      <Typography variant="h4">Create new accuracy</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={{ name: '', description: '' }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField name="name" label="Name" required />
            <TextField name="description" label="Description" multiline rows={4} required />

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
