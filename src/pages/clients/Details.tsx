import { useEffect, useState } from "react";
import { Client } from "../../client/types/client/Client"
import { Link, useParams } from "react-router-dom";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { useTpmClient } from "../../contexts/TpmClientContext";
import { LoadingScreen } from "../utils/LoadingScreen";

export const Details = () => {
  const { id } = useParams();

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();;
  const tpmClient = useTpmClient();

  const [client, setClient] = useState<Client>({} as Client);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    tpmClient.clients()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setClient(response);
          setBreadcrumbs([
            { label: 'Client', path: '/clients' },
            { label: response.name, path: `/clients/${response.id}` },
          ]);
          setLoading(false);
        },
        error: (error) => showError(`Error loading client ${id}`, error.message)
      });
  }, [id, setBreadcrumbs, showError, tpmClient]);

  const activate = () => {
    if (!id) return;

    tpmClient.clients()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => {
          showSuccess('Success', `Client ${id} activated`);
          setClient({ ...client, active: response.active });
        },
        error: (error) => showError(`Error activating client ${id}`, error.message),
      });
  }

  const deactivate = () => {
    if (!id) return;

    tpmClient.clients()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => {
          showSuccess('Success', `Client ${id} deactivated`);
          setClient({ ...client, active: response.active });
        },
        error: (error) => showError(`Error deactivating client ${id}`, error.message),
      });
  }

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4" gutterBottom>{client.name}</Typography>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Contact information</Typography>
        <Typography variant="body1">Email: {client.email}</Typography>
        <Typography variant="body1" gutterBottom>Phone: {client.phone}</Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Address</Typography>
        <Typography variant="body1">Address: {client.address}</Typography>
        <Typography variant="body1">City: {client.city}</Typography>
        <Typography variant="body1">State: {client.state}</Typography>
        <Typography variant="body1">Zip: {client.zip}</Typography>
        <Typography variant="body1" gutterBottom>Country: {client.country.name.common}</Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Details</Typography>
        <Typography variant="body1" gutterBottom>Client type: {client.type.name}</Typography>
        <Typography variant="body1" gutterBottom>VAT: { client.vat.length > 0 ? client.vat : 'N/A' }</Typography>
        <Typography variant="body1" gutterBottom>Active: { client.active ? 'Yes' : 'No' }</Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Notes</Typography>
        <Typography variant="body1" gutterBottom>{client.notes}</Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Actions</Typography>
        <Box component="span" pr={2}>
          <Button variant="contained" color="primary" component={Link} to="edit">Edit</Button>
        </Box>
        <Box component="span" pr={2}>
          {
            client.active
              ? <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button>
              : <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
          }
        </Box>
      </Paper>
    </Box>
  );
};
