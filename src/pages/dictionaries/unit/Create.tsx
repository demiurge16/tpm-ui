import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUnit, Measurement } from "../../../client/types/dictionaries/Unit";
import TpmClient from "../../../client/TpmClient";
import { Box, Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { NumberField } from "../../../components/form-controls/NumberField";
import { SelectField } from "../../../components/form-controls/SelectField";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";

export const Create = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const initialValues: CreateUnit = {
    name: '',
    description: '',
    volume: 0,
    measurement: 'CHARACTERS'
  };

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const snackbarContext = useContext(SnackbarContext);

  useEffect(() => {
    TpmClient.getInstance()
      .units()
      .refdata()
      .measurements()
      .subscribe({
        next: (data) => setMeasurements(data),
        error: (error) => setServerError(error.message),
      });

    breadcrumbsContext.setBreadcrumbs([
      { label: "Units", path: "/units" },
      { label: "Create", path: "/units/create" },
    ]);
  }, []);

  const handleSubmit = (data: CreateUnit) =>
    TpmClient.getInstance()
      .units()
      .create(data)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess("Success", "Unit created");
          navigate("/units");
        },
        error: (error) => {
          snackbarContext.showError("Error creating unit", error.message);
          setServerError(error.message);
        }
      });

  return (
    <Box>
      <Typography variant="h4">Create new unit</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField name="name" label="Name" required />
            <TextField name="description" label="Description" multiline rows={4} required />
            <NumberField name="volume" label="Volume" required />
            <SelectField name="measurement" label="Measurement" required
              options={
                measurements.map((e) => ({ key: e.code, value: e.name }))
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
