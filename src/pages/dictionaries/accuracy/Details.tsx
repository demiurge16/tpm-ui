import { useContext, useEffect, useState } from 'react';
import { Accuracy } from '../../../client/types/dictionaries/Accuracy';
import { Link, useParams } from 'react-router-dom';
import { BreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { Box, Button, Paper, Typography } from '@mui/material';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { useTpmClient } from '../../../contexts/TpmClientContext';
import { LoadingScreen } from '../../utils/LoadingScreen';

export const Details = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [accuracy, setAccuracy] = useState<Accuracy>({} as Accuracy);

  const { id } = useParams();
  const tpmClient = useTpmClient();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    if (!id) return;

    tpmClient.accuracies()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setAccuracy(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Accuracy', path: '/accuracy' },
            { label: response.name, path: `/accuracy/${response.id}` },
          ]);
          setLoading(false);
        },
        error: (error) => snackbarContext.showError(`Error loading accuracy ${id}`, error.message)
      });
  }, []);

  const activate = () => {
    if (!id) return;

    tpmClient.accuracies()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => setAccuracy({ ...accuracy, active: response.active }),
        error: (error) => snackbarContext.showError(`Error activating accuracy ${id}`, error.message)
      });
  }

  const deactivate = () => {
    if (!id) return;

    tpmClient.accuracies()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => setAccuracy({ ...accuracy, active: response.active }),
        error: (error) => snackbarContext.showError(`Error deactivating accuracy ${id}`, error.message)
      });
  }

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4" gutterBottom>{accuracy.name}</Typography>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Description</Typography>
        <Typography variant="body1" gutterBottom>{accuracy.description}</Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Details</Typography>
        <Typography variant="body1">Id: {accuracy.id}</Typography>
        <Typography variant="body1" gutterBottom>Active: {accuracy.active ? 'Yes' : 'No'}</Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Actions</Typography>

        <Box component="span" pr={2}>
          <Button variant="contained" color="primary" component={Link} to="edit">Edit</Button>
        </Box>
        <Box component="span" pr={2}>
          {
            accuracy.active ? 
              <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button> :
              <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
          }
        </Box>
      </Paper>
    </Box>
  );
};
