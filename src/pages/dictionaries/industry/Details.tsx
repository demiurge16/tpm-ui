import { useContext, useEffect, useState } from 'react';
import { Industry } from '../../../client/types/dictionaries/Industry';
import { Link, useParams } from 'react-router-dom';
import { BreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import TpmClient from '../../../client/TpmClient';
import { Box, Button, Typography } from '@mui/material';
import { SnackbarContext } from '../../../contexts/SnackbarContext';

export const Details = () => {
  const [industry, setIndustry] = useState<Industry>({
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
      .industries()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setIndustry(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Industry', path: 'industry' },
            { label: response.name, path: `industry/${response.id}` },
          ]);
        },
        error: (error) => snackbarContext.showError(`Error loading industry ${id}`, error.message)
      });
  }, []);

  const activate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .industries()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess("Success", `Industry ${id} activated`);
          setIndustry({ ...industry, active: response.active });
        },
        error: (error) => snackbarContext.showError(`Error activating industry ${id}`, error.message)
      });
  }

  const deactivate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .industries()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess("Success", `Industry ${id} deactivated`);
          setIndustry({ ...industry, active: response.active });
        },
        error: (error) => snackbarContext.showError(`Error deactivating industry ${id}`, error.message)
      });
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{industry.name}</Typography>

      <Typography variant="h5" gutterBottom>Description</Typography>
      <Typography variant="body1" gutterBottom>{industry.description}</Typography>

      <Typography variant="h5" gutterBottom>Details</Typography>
      <Typography variant="body1">Id: {industry.id}</Typography>
      <Typography variant="body1" gutterBottom>Active: {industry.active ? 'Yes' : 'No'}</Typography>

      <Typography variant="h5" gutterBottom>Actions</Typography>

      <Box component="span" pr={2}>
        <Button variant="contained" color="primary" component={Link} to={`edit`}>Edit</Button>
      </Box>
      <Box component="span" pr={2}>
        {
          industry.active ? 
            <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button> :
            <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
        }
      </Box>
    </Box>
  );
};
