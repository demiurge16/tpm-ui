import { useEffect, useState } from 'react';
import { Industry } from '../../../client/types/dictionaries/Industry';
import { Link, useParams } from 'react-router-dom';
import { useBreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useSnackbarContext } from '../../../contexts/SnackbarContext';
import { LoadingScreen } from '../../utils/LoadingScreen';
import { applicationClient } from '../../../client/ApplicationClient';

export const Details = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [industry, setIndustry] = useState<Industry>({} as Industry);

  const { id } = useParams();

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();

  useEffect(() => {
    if (!id) return;

    applicationClient.industries()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setIndustry(response);
          setBreadcrumbs([
            { label: 'Industry', path: 'industry' },
            { label: response.name, path: `industry/${response.id}` },
          ]);
          setLoading(false);
        },
        error: (error) => showError(`Error loading industry ${id}`, error.message)
      });
  }, [id, setBreadcrumbs, showError, applicationClient]);

  const activate = () => {
    if (!id) return;

    applicationClient.industries()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => {
          showSuccess("Success", `Industry ${id} activated`);
          setIndustry({ ...industry, active: response.active });
        },
        error: (error) => showError(`Error activating industry ${id}`, error.message)
      });
  }

  const deactivate = () => {
    if (!id) return;

    applicationClient.industries()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => {
          showSuccess("Success", `Industry ${id} deactivated`);
          setIndustry({ ...industry, active: response.active });
        },
        error: (error) => showError(`Error deactivating industry ${id}`, error.message)
      });
  }

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4" gutterBottom>{industry.name}</Typography>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Description</Typography>
        <Typography variant="body1" gutterBottom>{industry.description}</Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Details</Typography>
        <Typography variant="body1">Id: {industry.id}</Typography>
        <Typography variant="body1" gutterBottom>Active: {industry.active ? 'Yes' : 'No'}</Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Actions</Typography>

        <Box component="span" pr={2}>
          <Button variant="contained" color="primary" component={Link} to="edit">Edit</Button>
        </Box>
        <Box component="span" pr={2}>
          {
            industry.active ? 
              <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button> :
              <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
          }
        </Box>
      </Paper>
    </Box>
  );
};
