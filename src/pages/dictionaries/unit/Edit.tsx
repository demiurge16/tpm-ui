import { useContext, useEffect, useState } from 'react';
import { Measurement, UpdateUnit } from '../../../client/types/dictionaries/Unit';
import { useNavigate, useParams } from 'react-router-dom';
import { BreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { forkJoin } from 'rxjs';
import { Box, Button, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { TextField } from '../../../components/form-controls/TextField';
import { NumberField } from '../../../components/form-controls/NumberField';
import { SelectField } from '../../../components/form-controls/SelectField';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { useTpmClient } from '../../../contexts/TpmClientContext';

export const Edit = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [unit, setUnit] = useState<UpdateUnit>({
    name: '',
    description: '',
    volume: 0,
    measurement: 'POINTS'
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const tpmClient = useTpmClient();

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const snackbarContext = useContext(SnackbarContext);

  useEffect(() => {
    if (!id) return;

    forkJoin({
      unit: tpmClient.units().withId(id).get(),
      measurement: tpmClient.units().refdata().measurements()
    }).subscribe({
      next: ({unit, measurement}) => {
        setUnit({
          name: unit.name,
          description: unit.description,
          volume: unit.volume,
          measurement: unit.measurement.code
        });
        setMeasurements(measurements);
        breadcrumbsContext.setBreadcrumbs([
          { label: 'Units', path: '/units' },
          { label: unit.name, path: `/units/${unit.id}` },
          { label: 'Edit', path: `/units/${unit.id}/edit` }
        ]);
      },
      error: (error) => {
        snackbarContext.showError('Error loading unit', error.message);
        setServerError(error.message);
      }
    });
  }, [id]);

  const handleSubmit = (values: UpdateUnit) => {
    if (!id) return;

    tpmClient.units()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => navigate('/units'),
        error: (error) => setServerError(error)
      });
  };

  return (
    <Box>
      <Typography variant="h4">Edit {unit.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{
          name: unit.name,
          description: unit.description,
          volume: unit.volume,
          measurement: unit.measurement
        }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField name="name" label="Name" required />
            <TextField name="description" label="Description" multiline rows={4} required />
            <NumberField name="volume" label="Volume" required />
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
