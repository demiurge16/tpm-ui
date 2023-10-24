import { useEffect, useState } from "react";
import { Unit } from "../../../client/types/dictionaries/Unit";
import { Link, useParams } from "react-router-dom";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { applicationClient } from "../../../client/ApplicationClient";
import { LoadingScreen } from "../../utils/LoadingScreen";

export const Details = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [unit, setUnit] = useState<Unit>({} as Unit);

  const { id } = useParams();

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();
  useEffect(() => {
    if (!id) return;

    applicationClient.units()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setUnit(response);
          setBreadcrumbs([
            { label: 'Units', path: 'units' },
            { label: response.name, path: `units/${response.id}` },
          ]);
          setLoading(false);
        },
        error: (error) => showError(`Error loading unit ${id}`, error.message)
      });
  }, [id, setBreadcrumbs, showError, applicationClient]);

  const activate = () => {
    if (!id) return;

    applicationClient.units()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => {
          showSuccess("Success", `Unit ${id} activated`);
          setUnit({ ...unit, active: response.active });
        },
        error: (error) => showError(`Error activating unit ${id}`, error.message)
      });
  }

  const deactivate = () => {
    if (!id) return;

    applicationClient.units()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => {
          showSuccess("Success", `Unit ${id} deactivated`);
          setUnit({ ...unit, active: response.active });
        },
        error: (error) => showError(`Error deactivating unit ${id}`, error.message)
      });
  }

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4" gutterBottom>{unit.name}</Typography>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Description</Typography>
        <Typography variant="body1" gutterBottom>{unit.description}</Typography>
      </Paper>
      <Box pt={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Details</Typography>
        <Typography variant="body1">Id: {unit.id}</Typography>
        <Typography variant="body1">Volume: {unit.volume} {unit.measurement.name}</Typography>
        <Typography variant="body1" gutterBottom>Active: {unit.active ? 'Yes' : 'No'}</Typography>
      </Paper>
      <Box pt={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Actions</Typography>

        <Box component="span" pr={2}>
          <Button variant="contained" color="primary" component={Link} to="edit">Edit</Button>
        </Box>
        <Box component="span" pr={2}>
          {
            unit.active ? 
              <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button> :
              <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
          }
        </Box>
      </Paper>
    </Box>
  );
};
