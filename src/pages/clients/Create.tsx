import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { SelectField } from "../../components/form-controls/SelectField";
import { TextField } from "../../components/form-controls/TextField";
import { Client, CreateClient } from "../../client/types/client/Client";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { useTpmClient } from "../../contexts/TpmClientContext";
import { LoadingScreen } from "../utils/LoadingScreen";
import { useSubmitHandler } from "../../components/form/useSubmitHandler";
import { useRefdata } from "../../components/form/useRefdata";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";

export const Create = () => {
  const tpmClient = useTpmClient();
  const navigate = useNavigate();

  const { setBreadcrumbs } = useBreadcrumbsContext();
  const { loading, refdata, refdataError } = useRefdata(
    {
      countries: tpmClient.countries().all(),
      types: tpmClient.clientTypes().all()
    },
    (result) => setBreadcrumbs([
      { label: "Clients", path: "/clients" },
      { label: "Create", path: "/clients/create" }
    ])
  );

  const { showSuccess } = useSnackbarContext();
  const { handleSubmit, submitError } = useSubmitHandler<CreateClient, Client>({
    handleSubmit: (values: CreateClient) => tpmClient.clients().create(values),
    successHandler: (result: Client) => {
      showSuccess("Success", "Client created");
      navigate(`/clients/${result.id}`);
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
                    options={
                      refdata.types.items.map(
                        (e) => (
                          { 
                            key: e.id, value: e.name + (e.corporate ? " (corporate)" : "")
                          }
                        )
                      )
                    }
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
                    options={refdata.countries.items.map((e) => ({ key: e.code, value: e.name.common }))} />
                </Grid>
              </Grid>
            </Paper>
            <Box pb={2} />
            
            {(refdataError || submitError) && (
              <>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography color="error">Error: {refdataError || submitError}</Typography>
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
