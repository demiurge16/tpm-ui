import { useEffect, useContext, useState } from "react";
import { Client } from "../../client/types/client/Client"
import { useParams } from "react-router-dom";
import TpmClient from "../../client/TpmClient";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { Box, Button, Typography } from "@mui/material";

export const Details = () => {
  const [client, setClient] = useState<Client>({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: {
      code: '',
      name: ''
    },
    vat: '',
    notes: '',
    type: {
      id: '',
      name: '',
      description: '',
      corporate: false,
    },
    active: false
  });
  const { id } = useParams();

  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    if (!id) return;

    TpmClient.getInstance()
      .clients()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setClient(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Client', path: 'clients' },
            { label: response.name, path: `clients/${response.id}` },
          ]);
        },
        error: (error) => console.error(error)
      });
  }, []);

  const activate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .clients()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => setClient({ ...client, active: response.active }),
        error: (error) => console.error(error)
      });
  }

  const deactivate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .clients()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => setClient({ ...client, active: response.active }),
        error: (error) => console.error(error)
      });
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{client.name}</Typography>

      <Typography variant="h5" gutterBottom>Contact information</Typography>
      <Typography variant="body1">Email: {client.email}</Typography>
      <Typography variant="body1" gutterBottom>Phone: {client.phone}</Typography>

      <Typography variant="h5" gutterBottom>Address</Typography>
      <Typography variant="body1">Address: {client.address}</Typography>
      <Typography variant="body1">City: {client.city}</Typography>
      <Typography variant="body1">State: {client.state}</Typography>
      <Typography variant="body1">Zip: {client.zip}</Typography>
      <Typography variant="body1" gutterBottom>Country: {client.country.name}</Typography>

      <Typography variant="h5" gutterBottom>Details</Typography>
      <Typography variant="body1" gutterBottom>Client type: {client.type.name}</Typography>
      <Typography variant="body1" gutterBottom>VAT: { client.vat.length > 0 ? client.vat : 'N/A' }</Typography>
      <Typography variant="body1" gutterBottom>Active: { client.active ? 'Yes' : 'No' }</Typography>

      <Typography variant="h5" gutterBottom>Notes</Typography>
      <Typography variant="body1" gutterBottom>{client.notes}</Typography>

      <Typography variant="h5" gutterBottom>Actions</Typography>
      <Box component="span" pr={2}>
        <Button variant="contained" color="primary" component="a" href={`/clients/${client.id}/edit`}>Edit</Button>
      </Box>
      <Box component="span" pr={2}>
        {
          client.active
            ? <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button>
            : <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
        }
      </Box>
    </Box>
  );
};
