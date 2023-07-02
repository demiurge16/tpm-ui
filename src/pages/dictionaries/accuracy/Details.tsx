import { useContext, useEffect, useState } from 'react';
import { Accuracy } from '../../../client/types/dictionaries/Accuracy';
import { Link, useParams } from 'react-router-dom';
import { BreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import TpmClient from '../../../client/TpmClient';
import { Box, Button, Typography } from '@mui/material';

export const Details = () => {
  const [accuracy, setAccuracy] = useState<Accuracy>({
    id: '',
    name: '',
    description: '',
    active: false
  });

  const { id } = useParams();

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    if (!id) return;

    TpmClient.getInstance()
      .accuracies()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setAccuracy(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Accuracy', path: 'accuracy' },
            { label: response.name, path: `accuracy/${response.id}` },
          ]);
        },
        error: (error) => console.error(error)
      });
  }, []);

  const activate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .accuracies()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => setAccuracy({ ...accuracy, active: response.active }),
        error: (error) => console.error(error)
      });
  }

  const deactivate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .accuracies()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => setAccuracy({ ...accuracy, active: response.active }),
        error: (error) => console.error(error)
      });
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{accuracy.name}</Typography>

      <Typography variant="h5" gutterBottom>Description</Typography>
      <Typography variant="body1" gutterBottom>{accuracy.description}</Typography>

      <Typography variant="h5" gutterBottom>Details</Typography>
      <Typography variant="body1">Id: {accuracy.id}</Typography>
      <Typography variant="body1" gutterBottom>Active: {accuracy.active ? 'Yes' : 'No'}</Typography>

      <Typography variant="h5" gutterBottom>Actions</Typography>

      <Box component="span" pr={2}>
        <Button variant="contained" color="primary" component={Link} to={`${accuracy.id}/edit`}>Edit</Button>
      </Box>
      <Box component="span" pr={2}>
        {
          accuracy.active ? 
            <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button> :
            <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
        }
      </Box>
    </Box>
  );
};
