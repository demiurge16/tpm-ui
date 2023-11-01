import { useNavigate } from "react-router-dom";
import { CreateUnit, Unit } from "../../../client/types/dictionaries/Unit";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { NumberField } from "../../../components/form-controls/NumberField";
import { SelectField } from "../../../components/form-controls/SelectField";
import { useBreadcrumbs } from "../../../contexts/BreadcrumbsContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { number, object, string } from "yup";
import { applicationClient } from "../../../client/ApplicationClient";
import { LoadingScreen } from "../../utils/LoadingScreen";
import { useSubmitHandler } from "../../../components/form/useSubmitHandler";
import { useValidator } from "../../../components/form/useValidator";
import { useTranslation } from "react-i18next";
import { Translate } from "../../../components/i18n/Translate";
import { useMeasurements } from "./hooks/useMeasurements";

const Create = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'units.create' });
  const { showSuccess } = useSnackbarContext();

  useBreadcrumbs([
    { label: () => <Translate t={t} tKey='index' />, path: "/units" },
    { label: () => <Translate t={t} tKey='create' />, path: "/units/create" }
  ]);

  const { measurements, loading, loadingError } = useMeasurements();

  const { handleSubmit, submitError } = useSubmitHandler<CreateUnit, Unit>({
    handleSubmit: (values: CreateUnit) => applicationClient.units().create(values),
    successHandler: (result: Unit) => {
      showSuccess(
        t('successTitle'),
        t('successMessage', { id: result.id })
      );
      navigate(`/units/${result.id}`);
    }
  });

  const initialValues: CreateUnit = {
    name: '',
    description: '',
    volume: 0,
    measurement: 'CHARACTERS'
  };

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

  if (loading) {
    return (
      <Paper elevation={2} sx={{ p: 2 }}>
        <LoadingScreen />
      </Paper>
    );
  }

  if (loadingError) {
    return (
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>{t('loadingError')}</Typography>
        <Typography variant="body1" gutterBottom>{loadingError}</Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h4">{t('title')}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper elevation={2} sx={{ p: 2 }}>
              <TextField name="name" label={t('field.name')} required />
              <TextField name="description" label={t('field.description')} multiline rows={4} required />
              <NumberField name="volume" label={t('field.volume')} required />
              <SelectField name="measurement" label={t('field.measurement')} required
                options={
                  measurements.map((e) => ({ key: e.code, value: e.name }))
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

export default Create;
