import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Form } from "react-final-form";
import { useNavigate, useParams } from "react-router-dom";
import { environment } from "../../Environment";
import { SelectField } from "../../components/form-controls/SelectField";
import { TextField } from "../../components/form-controls/TextField";
import { Country } from "../dictionaries/country/types/Country";
import { ClientType } from "../dictionaries/client-type/types/ClientType";
import { Page } from "../../components/grid/Page";
import { Client } from "./types/Client";
import { ClientUpdateRequest } from "./types/ClientUpdateRequest";

export interface EditParams {
  id: string;
}

export const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const [countries, setCountries] = useState<Array<Country>>([]);
  const [types, setTypes] = useState<Array<ClientType>>([]);
  const [initialValues, setInitialValues] = useState<ClientUpdateRequest>({} as ClientUpdateRequest);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    Promise.all([
      axios.get<Page<Country>>(`${environment.apiUrl}/country`),
      axios.get<Page<ClientType>>(`${environment.apiUrl}/client-type`),
      axios.get<Client>(`${environment.apiUrl}/client/${id}`)
    ]).then(([countriesResponse, typesResponse, clientResponse]) => {
      return Promise.all([
        countriesResponse.data.items, typesResponse.data.items, clientResponse.data
      ]);
    }).then(([countries, types, client]) => {
      setCountries(countries);
      setTypes(types);
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
    });
  }, [id]);

  const handleSubmit = async (values: ClientUpdateRequest) =>
    axios.put(`${environment.apiUrl}/client/${id}`, values)
      .then(response => {
        navigate("/clients");
      })
      .catch(error => {
        setServerError(error);
      });

  return (
    <Box>
      <Typography variant="h4">Edit client</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField name="name" label="Name" required />
            <TextField name="email" label="Email" required />
            <TextField name="phone" label="Phone" required />
            <TextField name="address" label="Address" required />
            <TextField name="city" label="City" required />
            <TextField name="state" label="State" required />
            <TextField name="zip" label="Zip" required />
            <SelectField name="countryCode" label="Country" required
              options={countries.map((e) => ({ key: e.code, value: e.name}))} />
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
