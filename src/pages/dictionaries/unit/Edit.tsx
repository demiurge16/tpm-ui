import { Unit, UpdateUnit } from '../../../client/types/dictionaries/Unit';
import { useNavigate, useParams } from 'react-router-dom';
import { useBreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { TextField } from '../../../components/form-controls/TextField';
import { NumberField } from '../../../components/form-controls/NumberField';
import { SelectField } from '../../../components/form-controls/SelectField';
import { useSnackbarContext } from '../../../contexts/SnackbarContext';
import { LoadingScreen } from '../../utils/LoadingScreen';
import { applicationClient } from '../../../client/ApplicationClient';
import { useMeasurements } from './hooks/useMeasurements';
import { useUnit } from './hooks/useUnit';
import { Translate } from '../../../components/i18n/Translate';
import { useTranslation } from 'react-i18next';
import { useSubmitHandler } from '../../../components/form/useSubmitHandler';
import { useValidator } from '../../../components/form/useValidator';
import { number, object, string } from 'yup';

const Edit = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error('No id provided');
  }

  const { t } = useTranslation('translation', { keyPrefix: 'units.edit' });
  const navigate = useNavigate();
  const { setBreadcrumbs } = useBreadcrumbsContext();
  const { showSuccess } = useSnackbarContext();

  const { measurements, loading: measurementsLoading, loadingError: measurementsLoadingError } = useMeasurements();
  const { unit, loading: unitLoading, loadingError: unitLoadingError } =
    useUnit(id, (unit) => {
      setBreadcrumbs([
        { label: () => <Translate t={t} tKey='index' />, path: '/units' },
        { label: unit.name, path: `/units/${unit.id}` },
        { label: () => <Translate t={t} tKey='edit' />, path: `/units/${unit.id}/edit` }
      ]);
    });

  const { handleSubmit, submitError } = useSubmitHandler<UpdateUnit, Unit>({
    handleSubmit: (values: UpdateUnit) => applicationClient.units().withId(id).update(values),
    successHandler: (result: Unit) => {
      showSuccess(
        t('successTitle'),
        t('successMessage', { id: result.id })
      );
      navigate(`/units/${result.id}`);
    }
  });

  const validate = useValidator(
    object({
      name: string().required(t('validation.nameRequired'))
        .min(3, t('validation.nameMinLength'))
        .max(50, t('validation.nameMaxLength')),
      description: string().required(t('validation.descriptionRequired'))
        .min(3, t('validation.descriptionMinLength'))
        .max(1000, t('validation.descriptionMaxLength')),
      volume: number().required(t('validation.volumeRequired'))
        .integer(t('validation.volumeInteger'))
        .min(0, t('validation.volumeMin'))
        .max(1000000, t('validation.volumeMax')),
      measurement: string().required(t('validation.measurementRequired'))
    })
  );

  if (measurementsLoading || unitLoading) {
    return (
      <Paper elevation={2} sx={{ p: 2 }}>
        <LoadingScreen />
      </Paper>
    );
  }

  if (measurementsLoadingError || unitLoadingError) {
    return (
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>{t('loadingError')} {id}</Typography>
        {measurementsLoadingError && <Typography variant="body1" gutterBottom>{measurementsLoadingError}</Typography>}
        {unitLoadingError && <Typography variant="body1" gutterBottom>{unitLoadingError}</Typography>}
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h4">{t('edit')} {unit.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{
          name: unit.name,
          description: unit.description,
          volume: unit.volume,
          measurement: unit.measurement
        }}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper elevation={2} sx={{ p: 2 }}>
              <TextField name="name" label={t('field.name')} required />
              <TextField name="description" label={t('field.description')} multiline rows={4} required />
              <NumberField name="volume" label={t('field.volume')} required />
              <SelectField name="measurement" label={t('field.measurement')} required
                options={
                  measurements.map((e) => ({ key: e.code as string, value: e.name,}))
                }
              />
            </Paper>
            <Box pb={2} />

            {submitError && (
              <>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography color="error">{t('submitError')}: {submitError}</Typography>
                </Paper>
                <Box pb={2} />
              </>
            )}

            <Paper elevation={2} sx={{ p: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" disabled={submitting || pristine}>
                  {t('submit')}
                </Button>
                <Button type="button" disabled={submitting || pristine} onClick={() => form.reset()}>
                  {t('reset')}
                </Button>
              </Box>
            </Paper>
          </form>
        )}
      />
    </Box>
  );
};

export default Edit;
