import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { Box, Button, Paper, Typography } from '@mui/material';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { ServiceType } from '../../../client/types/dictionaries/ServiceType';
import { useTpmClient } from '../../../contexts/TpmClientContext';
import { LoadingScreen } from '../../utils/LoadingScreen';

export const Details = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [serviceType, setServiceType] = useState<ServiceType>({} as ServiceType);

  const { id } = useParams();
  const tpmClient = useTpmClient();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);
  
  useEffect(() => {
    if (!id) return;

    tpmClient.serviceTypes()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setServiceType(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Service types', path: 'service-types' },
            { label: response.name, path: `service-types/${response.id}` },
          ]);
          setLoading(false);
        },
        error: (error) => snackbarContext.showError(`Error loading service type ${id}`, error.message)
      });
  }, []);

  const activate = () => {
    if (!id) return;

    tpmClient.serviceTypes()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => setServiceType({ ...serviceType, active: response.active }),
        error: (error) => snackbarContext.showError(`Error activating service type ${id}`, error.message)
      });
  }

  const deactivate = () => {
    if (!id) return;

    tpmClient.serviceTypes()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => setServiceType({ ...serviceType, active: response.active }),
        error: (error) => snackbarContext.showError(`Error deactivating service type ${id}`, error.message)
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
