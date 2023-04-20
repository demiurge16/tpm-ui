import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ClientTypeCreateRequest } from "./types/ClientTypeCreateRequest";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { BooleanField } from "../../../components/form-controls/BooleanField";
import { useNavigate } from "react-router-dom";
import TpmClient from "../../../client/TpmClient";


export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: ClientTypeCreateRequest) =>
    TpmClient.getInstance()
      .clientTypes()
      .create(values)
      .subscribe({
        next: () => navigate("/dictionaries/client-types"),
        error: (error) => setServerError(error.message),
      });

  return (
    <Box>
      <Typography variant="h4">Create new client type</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={{ name: '', description: '', corporate: false }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField name="name" label="Name" required />
            <TextField name="description" label="Description" multiline rows={4} required />
            <BooleanField name="corporate" label="Corporate" required />

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
}
