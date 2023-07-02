import { useContext, useEffect, useState } from 'react';
import { UpdateIndustry } from '../../../client/types/dictionaries/Industry';
import { useNavigate, useParams } from 'react-router-dom';
import { BreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import TpmClient from '../../../client/TpmClient';

export const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [industry, setIndustry] = useState<UpdateIndustry>({
    name: '',
    description: ''
  });
  const navigate = useNavigate();
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
            { label: 'Industry', path: '/industry' },
            { label: response.name, path: `/industry/${response.id}` },
            { label: 'Edit', path: `/industry/${response.id}/edit` }
          ]);
        },
        error: (error) => setServerError(error)
      });
  }, [id]);

  const handleSubmit = (values: UpdateIndustry) => {
    if (!id) return;

    TpmClient.getInstance()
      .industries()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => navigate('/industries'),
        error: (error) => setServerError(error)
      });
  };

  return (
    <Box>
      <Typography variant="h4">Edit {industry.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={{ name: industry.name, description: industry.description }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField name="name" label="Name" required />
            <TextField name="description" label="Description" multiline rows={4} required />

            <Box pb={2} />
            {serverError && (
              <Typography color="error">Error: {serverError}</Typography>
            )}
            <Box pb={2} />

            <Button type="submit" disabled={submitting || pristine}>
              Submit
            </Button>
            <Button type="button" disabled={submitting || pristine} onClick={() => form.reset()}>
              Reset
            </Button>
          </form>
        )}
      />
    </Box>
  );
};
