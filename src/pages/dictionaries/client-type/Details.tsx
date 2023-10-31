import { useEffect, useState } from "react";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { ClientType } from "../../../client/types/client/ClientType";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { applicationClient } from "../../../client/ApplicationClient";
import { LoadingScreen } from "../../utils/LoadingScreen";

const Details = () => {
  const [clientType, setClientType] = useState<ClientType>({
    id: '',
    name: '',
    description: '',
    corporate: false,
    active: false
  });
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();

  useEffect(() => {
    if (!id) return;

    applicationClient.clientTypes()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setClientType(response);
          setBreadcrumbs([
            { label: 'Client type', path: 'client-types' },
            { label: response.name, path: `client-types/${response.id}` },
          ]);
          setLoading(false);
        },
        error: (error) => showError(`Error loading client type ${id}`, error.message)
      });
  }, [id, setBreadcrumbs, showError, applicationClient]);

  const activate = () => {
    if (!id) return;

    applicationClient.clientTypes()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => {
          showSuccess('Success', `Client type ${id} activated`);
          setClientType({ ...clientType, active: response.active });
        },
        error: (error) => showError(`Error activating client type ${id}`, error.message)
      });
  }

  const deactivate = () => {
    if (!id) return;

    applicationClient.clientTypes()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => {
          showSuccess('Success', `Client type ${id} deactivated`);
          setClientType({ ...clientType, active: response.active });
        },
        error: (error) => showError(`Error deactivating client type ${id}`, error.message)
      });
  }

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4" gutterBottom>{clientType.name}</Typography>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Description</Typography>
        <Typography variant="body1" gutterBottom>{clientType.description}</Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Details</Typography>
        <Typography variant="body1">Id: {clientType.id}</Typography>
        <Typography variant="body1">Corporate: {clientType.corporate ? 'Yes' : 'No'}</Typography>
        <Typography variant="body1" gutterBottom>Active: {clientType.active ? 'Yes' : 'No'}</Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Actions</Typography>
        <Box component="span" pr={2}>
          <Button variant="contained" color="primary" component={Link} to="edit">Edit</Button>
        </Box>
        <Box component="span" pr={2}>
          {
            clientType.active ? 
              <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button> :
              <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
          }
        </Box>
      </Paper>
    </Box>
  );
}

export default Details;
