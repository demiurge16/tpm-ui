import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import TpmClient from '../../../client/TpmClient';
import { Box, Button, Typography } from '@mui/material';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { ServiceType } from '../../../client/types/dictionaries/ServiceType';

export const Details = () => {
  const [serviceType, setServiceType] = useState<ServiceType>({
    id: '',
    name: '',
    description: '',
    active: false
  });

  const { id } = useParams();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);
  
  useEffect(() => {
    if (!id) return;

    TpmClient.getInstance()
      .serviceTypes()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setServiceType(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Service types', path: 'service-types' },
            { label: response.name, path: `service-types/${response.id}` },
          ]);
        },
        error: (error) => snackbarContext.showError(`Error loading service type ${id}`, error.message)
      });
  }, []);

  const activate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .serviceTypes()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => setServiceType({ ...serviceType, active: response.active }),
        error: (error) => snackbarContext.showError(`Error activating service type ${id}`, error.message)
      });
  }

  const deactivate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .serviceTypes()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => setServiceType({ ...serviceType, active: response.active }),
        error: (error) => snackbarContext.showError(`Error deactivating service type ${id}`, error.message)
      });
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{serviceType.name}</Typography>

      <Typography variant="h5" gutterBottom>Description</Typography>
      <Typography variant="body1" gutterBottom>{serviceType.description}</Typography>

      <Typography variant="h5" gutterBottom>Details</Typography>
      <Typography variant="body1">Id: {serviceType.id}</Typography>
      <Typography variant="body1" gutterBottom>Active: {serviceType.active ? 'Yes' : 'No'}</Typography>

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
    </Box>
  );
};
