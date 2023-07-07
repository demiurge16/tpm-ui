import { useContext, useEffect, useState } from "react";
import { Unit } from "../../../client/types/dictionaries/Unit";
import { Link, useParams } from "react-router-dom";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import TpmClient from "../../../client/TpmClient";
import { Box, Button, Typography } from "@mui/material";
import { SnackbarContext } from "../../../contexts/SnackbarContext";

export const Details = () => {
  const [unit, setUnit] = useState<Unit>({
    id: '',
    name: '',
    description: '',
    volume: 0,
    measurement: {
      code: 'POINTS',
      name: 'Points',
      description: 'Points',
    },
    active: false
  });

  const { id } = useParams();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    if (!id) return;

    TpmClient.getInstance()
      .units()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setUnit(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Units', path: 'units' },
            { label: response.name, path: `units/${response.id}` },
          ]);
        },
        error: (error) => snackbarContext.showError(`Error loading unit ${id}`, error.message)
      });
  }, []);

  const activate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .units()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess("Success", `Unit ${id} activated`);
          setUnit({ ...unit, active: response.active });
        },
        error: (error) => snackbarContext.showError(`Error activating unit ${id}`, error.message)
      });
  }

  const deactivate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .units()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess("Success", `Unit ${id} deactivated`);
          setUnit({ ...unit, active: response.active });
        },
        error: (error) => snackbarContext.showError(`Error deactivating unit ${id}`, error.message)
      });
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{unit.name}</Typography>

      <Typography variant="h5" gutterBottom>Description</Typography>
      <Typography variant="body1" gutterBottom>{unit.description}</Typography>

      <Typography variant="h5" gutterBottom>Details</Typography>
      <Typography variant="body1">Id: {unit.id}</Typography>
      <Typography variant="body1">Volume: {unit.volume} {unit.measurement.name}</Typography>
      <Typography variant="body1" gutterBottom>Active: {unit.active ? 'Yes' : 'No'}</Typography>

      <Typography variant="h5" gutterBottom>Actions</Typography>

      <Box component="span" pr={2}>
        <Button variant="contained" color="primary" component={Link} to={`edit`}>Edit</Button>
      </Box>
      <Box component="span" pr={2}>
        {
          unit.active ? 
            <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button> :
            <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
        }
      </Box>
    </Box>
  );
};
