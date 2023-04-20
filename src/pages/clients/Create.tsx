import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { ClientCreateRequest } from "./types/ClientCreateRequest";
import { environment } from "../../Environment";
import { SelectField } from "../../components/form-controls/SelectField";
import { TextField } from "../../components/form-controls/TextField";
import { Country } from "../dictionaries/country/types/Country";
import { ClientType } from "../dictionaries/client-type/types/ClientType";
import { Page } from "../../components/grid/Page";

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const [countries, setCountries] = useState<Array<Country>>([]);
  const [types, setTypes] = useState<Array<ClientType>>([]);

  const navigate = useNavigate();

  const initialValues: ClientCreateRequest = {
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
    Promise.all([
      axios.get<Page<Country>>(`${environment.apiUrl}/country`),
      axios.get<Page<ClientType>>(`${environment.apiUrl}/client-type`)
    ]).then(([countriesResponse, typesResponse]) => {
      return Promise.all([
        countriesResponse.data.items, typesResponse.data.items
      ]);
    }).then(([countries, types]) => {
      setCountries(countries);
      setTypes(types);
    });
  }, []);

  const handleSubmit = async (values: ClientCreateRequest) =>
    axios.post(`${environment.apiUrl}/client`, values)
      .then(response => {
        navigate("/clients");
      })
      .catch(error => {
        setServerError(error);
      });

  return (
    <Box>
      <Typography variant="h4">Create new client</Typography>
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
