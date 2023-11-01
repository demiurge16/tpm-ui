import { Link, useParams } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LoadingScreen } from '../../utils/LoadingScreen';
import { useServiceType } from './hooks/useServiceType';
import { useBreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { useTranslation } from 'react-i18next';
import { Translate } from '../../../components/i18n/Translate';

const Details = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error('No id provided');
  }

  const { t } = useTranslation('translation', { keyPrefix: 'serviceTypes.details' });
  const { setBreadcrumbs } = useBreadcrumbsContext();

  const { loading, loadingError, serviceType, activate, deactivate } =
    useServiceType(id, (serviceType) => {
      setBreadcrumbs([
        { label: () => <Translate t={t} tKey='index'/>, path: '/service-types' },
        { label: serviceType.name, path: `/service-types/${serviceType.id}` }
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
      <Typography variant="h4" gutterBottom>{serviceType.name}</Typography>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>{t('description')}</Typography>
        <Typography variant="body1" gutterBottom>{serviceType.description}</Typography>
      </Paper>
      <Box sx={{ pt: 2 }} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>{t('details')}</Typography>
        <Typography variant="body1">{t('id')}: {serviceType.id}</Typography>
        <Typography variant="body1" gutterBottom>{t('active')}: {serviceType.active ? t('yes') : t('no')}</Typography>
      </Paper>
      <Box sx={{ pt: 2 }} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>{t('actions')}</Typography>

        <Box component="span" pr={2}>
          <Button variant="contained" color="primary" component={Link} to="edit">{t('edit')}</Button>
        </Box>
        <Box component="span" pr={2}>
          {
            serviceType.active ? 
              <Button variant="contained" color="secondary" onClick={deactivate}>{t('deactivate')}</Button> :
              <Button variant="contained" color="secondary" onClick={activate}>{t('activate')}</Button>
          }
        </Box>
      </Paper>
    </Box>
  );
};

export default Details;
