import { useContext, useEffect, useState } from 'react';
import { Priority } from '../../../client/types/dictionaries/Priority';
import { Link, useParams } from 'react-router-dom';
import { BreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import TpmClient from '../../../client/TpmClient';
import { Box, Button, Typography } from '@mui/material';

export const Details = () => {
  const [priority, setPriority] = useState<Priority>({
    id: '',
    name: '',
    description: '',
    value: 0,
    emoji: '',
    active: false
  });

  const { id } = useParams();

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    if (!id) return;

    TpmClient.getInstance()
      .priorities()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setPriority(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Priority', path: 'priority' },
            { label: response.name, path: `priority/${response.id}` },
          ]);
        },
        error: (error) => console.error(error)
      });
  }, []);

  const activate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .priorities()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => setPriority({ ...priority, active: response.active }),
        error: (error) => console.error(error)
      });
  }

  const deactivate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .priorities()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => setPriority({ ...priority, active: response.active }),
        error: (error) => console.error(error)
      });
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{priority.name}</Typography>

      <Typography variant="h5" gutterBottom>Description</Typography>
      <Typography variant="body1" gutterBottom>{priority.description}</Typography>

      <Typography variant="h5" gutterBottom>Details</Typography>
      <Typography variant="body1">Id: {priority.id}</Typography>
      <Typography variant="body1">Value: {priority.value}</Typography>
      <Typography variant="body1">Emoji: {priority.emoji}</Typography>
      <Typography variant="body1" gutterBottom>Active: {priority.active ? 'Yes' : 'No'}</Typography>

      <Typography variant="h5" gutterBottom>Actions</Typography>

      <Box component="span" pr={2}>
        <Button variant="contained" color="primary" component={Link} to={`/accuracies/${priority.id}/edit`}>Edit</Button>
      </Box>
      <Box component="span" pr={2}>
        {
          priority.active ? 
            <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button> :
            <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
        }
      </Box>
    </Box>
  );
};
