import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUnit, Measurement, Unit } from "../../../client/types/dictionaries/Unit";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { NumberField } from "../../../components/form-controls/NumberField";
import { SelectField } from "../../../components/form-controls/SelectField";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { number, object, string } from "yup";
import { applicationClient } from "../../../client/ApplicationClient";
import { LoadingScreen } from "../../utils/LoadingScreen";
import { useSubmitHandler } from "../../../components/form/useSubmitHandler";
import { useValidator } from "../../../components/form/useValidator";

const Create = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const initialValues: CreateUnit = {
    name: '',
    description: '',
    volume: 0,
    measurement: 'CHARACTERS'
  };

  const { setBreadcrumbs } = useBreadcrumbsContext();
  const { showSuccess } = useSnackbarContext();
  const { handleSubmit, submitError } = useSubmitHandler<CreateUnit, Unit>({
    handleSubmit: (values: CreateUnit) => applicationClient.units().create(values),
    successHandler: (result: Unit) => {
      showSuccess("Success", "Unit created");
      navigate(`/units/${result.id}`);
    }
  });
  const validate = useValidator(
    object({
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
    })
  );

  useEffect(() => {
    applicationClient.units()
      .refdata()
      .measurements()
      .subscribe({
        next: (data) => {
          setMeasurements(data);
          setLoading(false);
        },
        error: (error) => setServerError(error.message),
      });

    setBreadcrumbs([
      { label: "Units", path: "/units" },
      { label: "Create", path: "/units/create" },
    ]);
  }, [setBreadcrumbs, applicationClient]);

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4">Create new unit</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper elevation={2} sx={{ p: 2 }}>
              <TextField name="name" label="Name" required />
              <TextField name="description" label="Description" multiline rows={4} required />
              <NumberField name="volume" label="Volume" required />
              <SelectField name="measurement" label="Measurement" required
                options={
                  measurements.map((e) => ({ key: e.code, value: e.name }))
                }
              />
            </Paper>

            <Box pb={2} />

            {(serverError || submitError) && (
              <>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography color="error">Error: {serverError || submitError}</Typography>
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

export default Create;
