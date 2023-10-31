import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useSnackbarContext } from '../../../contexts/SnackbarContext';
import { LoadingScreen } from '../../utils/LoadingScreen';
import { applicationClient } from '../../../client/ApplicationClient';
import { ServiceType } from '../../../client/types/dictionaries/ServiceType';

const Details = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error('No id provided');
  }

  const { loading, serviceType, loadingError, activate, deactivate } = useClient(id);

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
        <Typography variant="h4" gutterBottom>Error loading service type {id}</Typography>
        <Typography variant="body1" gutterBottom>{loadingError}</Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{serviceType.name}</Typography>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Description</Typography>
        <Typography variant="body1" gutterBottom>{serviceType.description}</Typography>
      </Paper>
      <Box sx={{ pt: 2 }} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Details</Typography>
        <Typography variant="body1">Id: {serviceType.id}</Typography>
        <Typography variant="body1" gutterBottom>Active: {serviceType.active ? 'Yes' : 'No'}</Typography>
      </Paper>
      <Box sx={{ pt: 2 }} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Actions</Typography>

        <Box component="span" pr={2}>
          <Button variant="contained" color="primary" component={Link} to="edit">Edit</Button>
        </Box>
        <Box component="span" pr={2}>
          {
            serviceType.active ? 
              <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button> :
              <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
          }
        </Box>
      </Paper>
    </Box>
  );
};

export default Details;

const useClient = (id: string) => {
  const { setBreadcrumbs } = useBreadcrumbsContext();
  const { showError } = useSnackbarContext();

  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<ServiceType>({} as ServiceType);

  useEffect(() => {
    setLoading(true);
    applicationClient.serviceTypes()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setServiceType(response);
          setLoading(false);
          setBreadcrumbs([
            { label: 'Service types', path: 'service-types' },
            { label: response.name, path: `service-types/${response.id}` },
          ]);
        },
        error: (error) => {
          setLoadingError(error.message);
          setLoading(false);
          setBreadcrumbs([
            { label: 'Service types', path: 'service-types' }
          ]);
        }
      });
  }, []);

  const activate = () => 
    applicationClient.serviceTypes()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => setServiceType(prev => ({ ...prev, active: response.active })),
        error: (error) => showError(`Error activating service type ${id}`, error.message)
      });

  const deactivate = () => 
    applicationClient.serviceTypes()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => setServiceType(prev => ({ ...prev, active: response.active })),
        error: (error) => showError(`Error deactivating service type ${id}`, error.message)
      });

  return {
    loading,
    serviceType,
    loadingError,
    activate,
    deactivate
  };
}
