import { useContext, useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { SelectField } from "../../components/form-controls/SelectField";
import { TextField } from "../../components/form-controls/TextField";
import { CreateClient } from "../../client/types/client/Client";
import { Country } from "../../client/types/dictionaries/Country";
import { ClientType } from "../../client/types/client/ClientType";
import { forkJoin, map } from "rxjs";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { AsyncSelectField } from "../../components/form-controls/AsyncSelectField";
import { useTpmClient } from "../../contexts/TpmClientContext";

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);

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

  return (
    <Box>
      <Typography variant="h4">Create new client</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={initialValues}
        keepDirtyOnReinitialize
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField name="name" label="Name" required />
            <TextField name="email" label="Email" required />
            <TextField name="phone" label="Phone" required />
            <TextField name="address" label="Address" required />
            <TextField name="city" label="City" required />
            <TextField name="state" label="State" required />
            <TextField name="zip" label="Zip" required />
            <AsyncSelectField name="countryCode" label="Country" required
              optionsLoader={(search) =>
                tpmClient
                  .countries()
                  .all({
                    page: 0,
                    pageSize: 25,
                    sort: [{
                      field: 'name',
                      direction: 'asc'
                    }],
                    filters: [
                      {
                        field: 'name',
                        operator: 'contains',
                        value: search
                      }
                    ]
                  })
                  .pipe(
                    map((response) => {
                      return {
                        items: response.items.map((language) => ({ key: language.code, value: language.name })),
                        currentPage: response.currentPage,
                        totalPages: response.totalPages,
                        totalItems: response.totalItems,
                        hasNextPage: response.hasNextPage,
                        hasPreviousPage: response.hasPreviousPage
                      };
                    }
                  ))
              }
            />
            <TextField name="vat" label="VAT" required />
            <TextField name="notes" label="Notes" required />
            <SelectField name="clientTypeId" label="Client type" required
              options={types.map((e) => ({ key: e.id, value: e.name}))} />
            
            <Box pb={2} />
            {serverError && (
              <Typography color="error">Error: {serverError}</Typography>
            )}
            <Box pb={2} />

            <Button type="submit" disabled={submitting || pristine}>
              Submit
            </Button>
            <Button type="button" disabled={submitting || pristine} onClick={() => form.reset()}>
              Reset
            </Button>
          </form>
        )} />
    </Box>
  );
};
