import { useContext, useState, useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { SelectField } from "../../components/form-controls/SelectField";
import { TextField } from "../../components/form-controls/TextField";
import { CreateClient } from "../../client/types/client/Client";
import { Country } from "../../client/types/dictionaries/Country";
import { ClientType } from "../../client/types/client/ClientType";
import { forkJoin } from "rxjs";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { useTpmClient } from "../../contexts/TpmClientContext";
import { LoadingScreen } from "../utils/LoadingScreen";

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [countries, setCountries] = useState<Array<Country>>([]);
  const [types, setTypes] = useState<Array<ClientType>>([]);

  const navigate = useNavigate();
  const tpmClient = useTpmClient();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const initialValues: CreateClient = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    countryCode: '',
    vat: '',
    notes: '',
    clientTypeId: ''
  };

  useEffect(() => {
    forkJoin({
      countries: tpmClient.countries().all(),
      types: tpmClient.clientTypes().all()
    }).subscribe({
      next: (response) => {
        setCountries(response.countries.items);
        setTypes(response.types.items);
        setLoading(false);
      },
      error: (error) => {
        snackbarContext.showError("Error loading reference data", error.message);
        setServerError(error.message);
      }
    });

    breadcrumbsContext.setBreadcrumbs([
      { label: "Clients", path: "/clients" },
      { label: "Create", path: "/clients/create" },
    ]);
  }, []);

  const handleSubmit = async (values: CreateClient) =>
    tpmClient
      .clients()
      .create(values)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess("Success", "Client created");
          navigate("/clients");
        },
        error: (error) => {
          snackbarContext.showError("Error creating client", error.message);
          setServerError(error.message);
        }
      });

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4">Create new client</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={initialValues}
        keepDirtyOnReinitialize
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>General information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField name="name" label="Name" required />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="notes" label="Notes" required multiline rows={4} />
                </Grid>
                <Grid item xs={6}>
                  <SelectField name="clientTypeId" label="Client type" required
                    options={types.map((e) => ({ key: e.id, value: e.name}))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="vat" label="VAT" required />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>Contact information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField name="email" label="Email" required />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="phone" label="Phone" required />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>Address</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField name="address" label="Address" required />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="city" label="City" required />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="state" label="State" required />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="zip" label="Zip" required />
                </Grid>
                <Grid item xs={12}>
                  <SelectField name="countryCode" label="Country" required
                    options={countries.map((e) => ({ key: e.code, value: e.name.common }))} />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />
            
            {serverError && (
              <>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography color="error">Error: {serverError}</Typography>
                </Paper>
                <Box pb={2} />
              </>
            )}

            <Paper elevation={2} sx={{ p: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" disabled={submitting || pristine}>
                  Submit
                </Button>
                <Button type="button" disabled={submitting || pristine} onClick={() => form.reset()}>
                  Reset
                </Button>
              </Box>
            </Paper>
          </form>
        )} />
    </Box>
  );
};
