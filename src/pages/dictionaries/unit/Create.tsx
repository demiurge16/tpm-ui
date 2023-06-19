import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUnit, Measurement } from "../../../client/types/dictionaries/Unit";
import TpmClient from "../../../client/TpmClient";
import { Box, Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { NumberField } from "../../../components/form-controls/NumberField";
import { SelectField } from "../../../components/form-controls/SelectField";

export const Create = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    TpmClient.getInstance()
      .units()
      .refdata()
      .measurements()
      .subscribe({
        next: (data) => setMeasurements(data),
        error: (error) => setServerError(error.message),
      });
  }, []);

  const handleSubmit = async (data: CreateUnit) =>
    TpmClient.getInstance()
      .units()
      .create(data)
      .subscribe({
        next: () => navigate("/units"),
        error: (error) => setServerError(error.message),
      });

  return (
    <Box>
      <Typography variant="h4">Create new unit</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={{ name: '', description: '', corporate: false }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField name="name" label="Name" required />
            <TextField name="description" label="Description" multiline rows={4} required />
            <NumberField name="value" label="Value" required />
            <SelectField name="measurement" label="Measurement" required
              options={
                measurements.map((e) => ({ key: e.code as string, value: e.name,}))
              }
            />

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
