import { Link, useParams } from "react-router-dom";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LoadingScreen } from "../../utils/LoadingScreen";
import { useUnit } from "./hooks/useUnit";
import { useTranslation } from "react-i18next";
import { Translate } from "../../../components/i18n/Translate";
import { SecuredComponent } from "../../../components/security/SecuredComponent";

const Details = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error('No id provided');
  }

  const { t } = useTranslation('translation', { keyPrefix: 'units.details' });
  const { setBreadcrumbs } = useBreadcrumbsContext();

  const { loading, loadingError, unit, activate, deactivate } =
    useUnit(id, (unit) => {
      setBreadcrumbs([
        { label: () => <Translate t={t} tKey='index' />, path: '/units' },
        { label: unit.name, path: `/units/${unit.id}` }
      ]);
    });

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
        <Typography variant="h4" gutterBottom>{t('loadingError')} {id}</Typography>
        <Typography variant="body1" gutterBottom>{loadingError}</Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{unit.name}</Typography>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>{t('description')}</Typography>
        <Typography variant="body1" gutterBottom>{unit.description}</Typography>
      </Paper>
      <Box pt={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>{t('details')}</Typography>
        <Typography variant="body1">{t('id')}: {unit.id}</Typography>
        <Typography variant="body1">{t('volume')}: {unit.volume} {unit.measurement.name}</Typography>
        <Typography variant="body1" gutterBottom>{t('active')}: {unit.active ? t('yes') : t('no')}</Typography>
      </Paper>
      <Box pt={2} />

      <SecuredComponent roles={['admin', 'project-manager']}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>{t('actions')}</Typography>

          <Box component="span" pr={2}>
            <Button variant="contained" color="primary" component={Link} to="edit">{t('edit')}</Button>
          </Box>
          <Box component="span" pr={2}>
            {
              unit.active ? 
                <Button variant="contained" color="secondary" onClick={deactivate}>{t('deactivate')}</Button> :
                <Button variant="contained" color="secondary" onClick={activate}>{t('activate')}</Button>
            }
          </Box>
        </Paper>
      </SecuredComponent>
    </Box>
  );
};

export default Details;


