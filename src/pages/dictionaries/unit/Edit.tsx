import { useContext, useEffect, useState } from 'react';
import { Measurement, UpdateUnit } from '../../../client/types/dictionaries/Unit';
import { useNavigate, useParams } from 'react-router-dom';
import { BreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { forkJoin } from 'rxjs';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { TextField } from '../../../components/form-controls/TextField';
import { NumberField } from '../../../components/form-controls/NumberField';
import { SelectField } from '../../../components/form-controls/SelectField';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { useTpmClient } from '../../../contexts/TpmClientContext';
import { LoadingScreen } from '../../utils/LoadingScreen';

export const Edit = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
        setLoading(false);
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

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
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
            <Paper elevation={2} sx={{ p: 2 }}>
              <TextField name="name" label="Name" required />
              <TextField name="description" label="Description" multiline rows={4} required />
              <NumberField name="volume" label="Volume" required />
              <SelectField name="measurement" label="Measurement" required
                options={
                  measurements.map((e) => ({ key: e.code as string, value: e.name,}))
                }
              />
            </Paper>
            <Box pb={2} />

            {serverError && (
              <>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography color="error">Error: {serverError}</Typography>
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
