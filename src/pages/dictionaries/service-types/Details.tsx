import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useSnackbarContext } from '../../../contexts/SnackbarContext';
import { ServiceType } from '../../../client/types/dictionaries/ServiceType';
import { LoadingScreen } from '../../utils/LoadingScreen';
import { applicationClient } from '../../../client/ApplicationClient';

export const Details = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [serviceType, setServiceType] = useState<ServiceType>({} as ServiceType);

  const { id } = useParams();

  const { showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();
  
  useEffect(() => {
    if (!id) return;

    applicationClient.serviceTypes()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setServiceType(response);
          setBreadcrumbs([
            { label: 'Service types', path: 'service-types' },
            { label: response.name, path: `service-types/${response.id}` },
          ]);
          setLoading(false);
        },
        error: (error) => showError(`Error loading service type ${id}`, error.message)
      });
  }, [id, setBreadcrumbs, showError, applicationClient]);

  const activate = () => {
    if (!id) return;

    applicationClient.serviceTypes()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => setServiceType({ ...serviceType, active: response.active }),
        error: (error) => showError(`Error activating service type ${id}`, error.message)
      });
  }

  const deactivate = () => {
    if (!id) return;

    applicationClient.serviceTypes()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => setServiceType({ ...serviceType, active: response.active }),
        error: (error) => showError(`Error deactivating service type ${id}`, error.message)
      });
  }

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
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
