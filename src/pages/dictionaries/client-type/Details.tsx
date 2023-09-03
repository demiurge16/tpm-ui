import { useContext, useEffect, useState } from "react";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { ClientType } from "../../../client/types/client/ClientType";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { useTpmClient } from "../../../contexts/TpmClientContext";

export const Details = () => {
  const [clientType, setClientType] = useState<ClientType>({
    id: '',
    name: '',
    description: '',
    corporate: false,
    active: false
  });

  const { id } = useParams();
  const tpmClient = useTpmClient();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    if (!id) return;

    tpmClient.clientTypes()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setClientType(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Client type', path: 'client-types' },
            { label: response.name, path: `client-types/${response.id}` },
          ]);
        },
        error: (error) => snackbarContext.showError(`Error loading client type ${id}`, error.message)
      });
  }, []);

  const activate = () => {
    if (!id) return;

    tpmClient.clientTypes()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess('Success', `Client type ${id} activated`);
          setClientType({ ...clientType, active: response.active });
        },
        error: (error) => snackbarContext.showError(`Error activating client type ${id}`, error.message)
      });
  }

  const deactivate = () => {
    if (!id) return;

    tpmClient.clientTypes()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess('Success', `Client type ${id} deactivated`);
          setClientType({ ...clientType, active: response.active });
        },
        error: (error) => snackbarContext.showError(`Error deactivating client type ${id}`, error.message)
      });
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{clientType.name}</Typography>

      <Typography variant="h5" gutterBottom>Description</Typography>
      <Typography variant="body1" gutterBottom>{clientType.description}</Typography>

      <Typography variant="h5" gutterBottom>Details</Typography>
      <Typography variant="body1">Id: {clientType.id}</Typography>
      <Typography variant="body1">Corporate: {clientType.corporate ? 'Yes' : 'No'}</Typography>
      <Typography variant="body1" gutterBottom>Active: {clientType.active ? 'Yes' : 'No'}</Typography>

      <Typography variant="h5" gutterBottom>Actions</Typography>

      <Box component="span" pr={2}>
        <Button variant="contained" color="primary" component={Link} to={`edit`}>Edit</Button>
      </Box>
      <Box component="span" pr={2}>
        {
          clientType.active ? 
            <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button> :
            <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
        }
      </Box>
    </Box>
  );
}
