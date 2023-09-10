import { useState, useEffect, useContext } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "react-final-form";
import { useNavigate, useParams } from "react-router-dom";
import { SelectField } from "../../components/form-controls/SelectField";
import { TextField } from "../../components/form-controls/TextField";
import { Country } from "../../client/types/dictionaries/Country";
import { ClientType } from "../../client/types/client/ClientType";
import { UpdateClient } from "../../client/types/client/Client";
import { forkJoin } from "rxjs";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { useTpmClient } from "../../contexts/TpmClientContext";

export interface EditParams {
  id: string;
}

export const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const [countries, setCountries] = useState<Array<Country>>([]);
  const [types, setTypes] = useState<Array<ClientType>>([]);
  const [initialValues, setInitialValues] = useState<UpdateClient>({} as UpdateClient);

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const tpmClient = useTpmClient();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }

    forkJoin({
      countries: tpmClient.countries().all(),
      types: tpmClient.clientTypes().all(),
      client: tpmClient.clients().withId(id).get()
    }).subscribe({
      next: (response) => {
        const { countries, types, client } = response;

        setCountries(countries.items);
        setTypes(types.items);
        setInitialValues({
          name: client.name,
          email: client.email,
          phone: client.phone,
          address: client.address,
          city: client.city,
          state: client.state,
          zip: client.zip,
          countryCode: client.country.code,
          vat: client.vat,
          notes: client.notes,
          clientTypeId: client.type.id
        });

        breadcrumbsContext.setBreadcrumbs([
          { label: "Clients", path: "/clients" },
          { label: client.name, path: `/clients/${id}` },
          { label: "Edit", path: `/clients/${id}/edit` }
        ]);
      },
      error: (error) => {
        setServerError(error.message);
        snackbarContext.showError(`Error loading client ${id}`, error.message);
      }
    });
  }, [id]);

  const handleSubmit = async (values: UpdateClient) => {
    if (!id) {
      return;
    }

    tpmClient.clients()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess("Success", "Client updated successfully");
          navigate("/clients");
        },
        error: (error) =>{
          snackbarContext.showError("Error updating client", error.message);
          setServerError(error.message);
        }
      });
  }

  return (
    <Box>
      <Typography variant="h4">Edit {initialValues.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={initialValues}
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
