import { useContext, useEffect, useState } from 'react';
import { Industry } from '../../../client/types/dictionaries/Industry';
import { Link, useParams } from 'react-router-dom';
import { BreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import TpmClient from '../../../client/TpmClient';
import { Box, Button, Typography } from '@mui/material';

export const Details = () => {
  const [industry, setIndustry] = useState<Industry>({
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
        error: (error) => console.error(error)
      });
  }, []);

  const activate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .industries()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => setIndustry({ ...industry, active: response.active }),
        error: (error) => console.error(error)
      });
  }

  const deactivate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .industries()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => setIndustry({ ...industry, active: response.active }),
        error: (error) => console.error(error)
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
        <Button variant="contained" color="primary" component={Link} to={`${industry.id}/edit`}>Edit</Button>
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
