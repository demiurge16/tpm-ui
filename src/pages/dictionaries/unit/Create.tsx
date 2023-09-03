import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUnit, Measurement } from "../../../client/types/dictionaries/Unit";
import { Box, Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { NumberField } from "../../../components/form-controls/NumberField";
import { SelectField } from "../../../components/form-controls/SelectField";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { number, object, string } from "yup";
import { validateWithSchema } from "../../../utils/validate";
import { useTpmClient } from "../../../contexts/TpmClientContext";

export const Create = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const tpmClient = useTpmClient();

  const initialValues: CreateUnit = {
    name: '',
    description: '',
    volume: 0,
    measurement: 'CHARACTERS'
  };

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const snackbarContext = useContext(SnackbarContext);

  useEffect(() => {
    tpmClient.units()
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

  const validationSchema = object({
    name: string().required("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be at most 50 characters long"),
    description: string().required("Description is required")
      .min(3, "Description must be at least 3 characters long")
      .max(1000, "Description must be at most 1000 characters long"),
    volume: number().required("Volume is required")
      .integer("Volume must be an integer")
      .min(0, "Volume must be at least 0")
      .max(1000000, "Volume must be at most 1000000"),
    measurement: string().required("Measurement is required")
  });

  const handleSubmit = (data: CreateUnit) =>
    tpmClient.units()
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
        keepDirtyOnReinitialize
        initialValues={initialValues}
        validate={(values) => validateWithSchema(validationSchema, values)}
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
