import { useEffect, useState } from 'react';
import { Priority } from '../../../client/types/dictionaries/Priority';
import { Link, useParams } from 'react-router-dom';
import { useBreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useSnackbarContext } from '../../../contexts/SnackbarContext';
import { LoadingScreen } from '../../utils/LoadingScreen';
import { applicationClient } from '../../../client/ApplicationClient';

const Details = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [priority, setPriority] = useState<Priority>({} as Priority);

  const { id } = useParams();

  const { showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();
  
  useEffect(() => {
    if (!id) return;

    applicationClient.priorities()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setPriority(response);
          setBreadcrumbs([
            { label: 'Priority', path: 'priority' },
            { label: response.name, path: `priority/${response.id}` },
          ]);
          setLoading(false);
        },
        error: (error) => showError(`Error loading priority ${id}`, error.message)
      });
  }, [id, setBreadcrumbs, showError, applicationClient]);

  const activate = () => {
    if (!id) return;

    applicationClient.priorities()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => setPriority({ ...priority, active: response.active }),
        error: (error) => showError(`Error activating priority ${id}`, error.message)
      });
  }

  const deactivate = () => {
    if (!id) return;

    applicationClient.priorities()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => setPriority({ ...priority, active: response.active }),
        error: (error) => showError(`Error deactivating priority ${id}`, error.message)
      });
  }

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4" gutterBottom>{priority.name}</Typography>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Description</Typography>
        <Typography variant="body1" gutterBottom>{priority.description}</Typography>
      </Paper>
      <Box pt={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Details</Typography>
        <Typography variant="body1">Id: {priority.id}</Typography>
        <Typography variant="body1">Value: {priority.value}</Typography>
        <Typography variant="body1">Emoji: {priority.emoji}</Typography>
        <Typography variant="body1" gutterBottom>Active: {priority.active ? 'Yes' : 'No'}</Typography>
      </Paper>
      <Box pt={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Actions</Typography>

        <Box component="span" pr={2}>
          <Button variant="contained" color="primary" component={Link} to="edit">Edit</Button>
        </Box>
        <Box component="span" pr={2}>
          {
            priority.active ? 
              <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button> :
              <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
          }
        </Box>
      </Paper>
    </Box>
  );
};

export default Details;
