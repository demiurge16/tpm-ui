import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "react-final-form";
import { useNavigate, useParams } from "react-router-dom";
import { SelectField } from "../../components/form-controls/SelectField";
import { TextField } from "../../components/form-controls/TextField";
import { Client, UpdateClient } from "../../client/types/client/Client";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { useSubmitHandler } from "../../components/form/useSubmitHandler";
import { useRefdata } from "../../components/form/useRefdata";
import { LoadingScreen } from "../utils/LoadingScreen";
import { AsyncSelectField } from "../../components/form-controls/AsyncSelectField";
import { applicationClient } from "../../client/ApplicationClient";

export interface EditParams {
  id: string;
}

export const Edit = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("Missing id parameter");
  }

  const { setBreadcrumbs } = useBreadcrumbsContext();

  const { loading, refdata, refdataError } = useRefdata(
    {
      countries: applicationClient.countries().all(),
      types: applicationClient.clientTypes().all(),
      client: applicationClient.clients().withId(id).get()
    },
    (result) => setBreadcrumbs([
      { label: "Clients", path: "/clients" },
      { label: result.client.name, path: `/clients/${result.client.id}` },
      { label: "Edit", path: `/clients/${result.client.id}/edit` }
    ])
  );

  const { countries, types, client } = refdata;

  const { showSuccess } = useSnackbarContext();
  const navigate = useNavigate();

  const { handleSubmit, submitError } = useSubmitHandler<UpdateClient, Client>({
    handleSubmit: (values: UpdateClient) => applicationClient.clients().withId(id).update(values),
    successHandler: (result: Client) => {
      showSuccess("Success", "Client updated successfully");
      navigate(`/clients/${result.id}`);
    }
  });

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4">Edit {client.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{
          name: client.name,
          notes: client.notes,
          clientTypeId: client.type.id,
          vat: client.vat,
          email: client.email,
          phone: client.phone,
          address: client.address,
          city: client.city,
          state: client.state,
          zip: client.zip,
          countryCode: client.country.code
        }}
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
                    options={types.items.map((e) => ({ key: e.id, value: e.name}))}
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
                  <AsyncSelectField name="countryCode" label="Country" required
                    options={countries.items.map((e) => ({ key: e.code, value: e.name.common }))} />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />
            
            {(refdataError || submitError) && (
              <>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography color="error">Error: {(refdataError || submitError)}</Typography>
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
