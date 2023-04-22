import { Box, Button, Typography } from "@mui/material";
import { ColDef, ColGroupDef, GridApi } from "ag-grid-community";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Field } from "../../components/grid/Field";
import { Grid } from "../../components/grid/Grid";
import { Page } from "../../components/grid/Page";
import { QueryableColumnDefinition } from "../../components/grid/QueryableColumnDefinition";
import { environment } from "../../Environment";
import { ClientType } from "../dictionaries/client-type/types/ClientType";
import { Country } from "../dictionaries/country/types/Country";
import { Client } from "./types/Client";


export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const [columnDefs, setColumnDefs] = useState<Array<(ColDef<Client> | ColGroupDef<Client>)>>([]);

  const [queryDefinitions, setQueryDefinitions] = useState<Array<QueryableColumnDefinition>>([]);

  useEffect(() => {
    Promise.all([
      axios.get<Page<Country>>(`${environment.apiUrl}/country`),
      axios.get<Page<ClientType>>(`${environment.apiUrl}/client-type`)
    ]).then(([countriesResponse, typesResponse]) => {
      return Promise.all([
        countriesResponse.data, typesResponse.data
      ]);
    }).then(([countries, types]) => {
      setColumnDefs([
        { headerName: "Id", field: "id", resizable: true },
        { headerName: "Name", field: "name", resizable: true },
        { headerName: "Email", field: "email", resizable: true },
        { headerName: "Phone", field: "phone", resizable: true },
        { headerName: "Address", field: "address", resizable: true },
        { headerName: "City", field: "city", resizable: true },
        { headerName: "State", field: "state", resizable: true },
        { headerName: "Zip", field: "zip", resizable: true },
        {
          headerName: "Country",
          field: "country",
          resizable: true,
          valueFormatter: (params) => params.value.name
        },
        { headerName: "VAT", field: "vat", resizable: true },
        {
          headerName: "Type",
          field: "type",
          resizable: true,
          valueFormatter: (params) => params.value.name
        },
        { headerName: "Active", field: "active", resizable: true },
        {
          headerName: "Actions",
          field: "actions",
          resizable: true,
          cellRenderer: (params: any) => {
            const clientType = params.data as ClientType;
            const gridApi = params.api as GridApi;
    
            const refresh = (data: any) => {
              const rowNode = gridApi.getRowNode(params.rowIndex);
    
              if (rowNode) {
                rowNode.setDataValue('active', data.active);
                gridApi.refreshCells({ force: true });
              }
            };
    
            return (
              <Box>
                <Box component="span" pr={2}>
                  <Button variant="contained" component={Link} to={`edit/${clientType.id}`}>Edit</Button>
                </Box>
    
                {
                  clientType.active ?
                    <Box component="span" pr={2}>
                      <Button variant="contained" onClick={() => deactivate(clientType.id, (data) => refresh(data))}>Deactivate</Button>
                    </Box>
                    :
                    <Box component="span" pr={2}>
                      <Button variant="contained" onClick={() => activate(clientType.id, (data) => refresh(data))}>Activate</Button>
                    </Box>
                }
    
              </Box>
            );
          }
        
        }
      ]);

      setQueryDefinitions([
        {
          id: "id",
          name: "Id",
          filter: true,
          type: Field.STRING
        },
        {
          id: "name",
          name: "Name",
          filter: true,
          type: Field.STRING
        },
        {
          id: "email",
          name: "Email",
          filter: true,
          type: Field.STRING
        },
        {
          id: "phone",
          name: "Phone",
          filter: true,
          type: Field.STRING
        },
        {
          id: "address",
          name: "Address",
          filter: true,
          type: Field.STRING
        },
        {
          id: "city",
          name: "City",
          filter: true,
          type: Field.STRING
        },
        {
          id: "state",
          name: "State",
          filter: true,
          type: Field.STRING
        },
        {
          id: "zip",
          name: "Zip",
          filter: true,
          type: Field.STRING
        },
        {
          id: "country.code",
          name: "Country",
          filter: true,
          type: Field.SELECT,
          options: countries.items.map(c => ({ value: c.code, label: c.name }))
        },
        {
          id: "vat",
          name: "VAT",
          filter: true,
          type: Field.STRING
        },
        {
          id: "type.id.value",
          name: "Type",
          filter: true,
          type: Field.SELECT,
          options: types.items.map(t => ({ value: t.id, label: t.name }))
        },
        {
          id: "active",
          name: "Active",
          filter: true,
          type: Field.BOOLEAN
        }
      ]);
    });
  }, []);

  const activate = (id: string, refresh: (data: any) => void) => axios.patch(`${environment.apiUrl}/client/${id}/activate`)
    .then(response => {
      console.log(`Activated ${id}`);
      refresh(response.data);
    })
    .catch(error => {
      console.log(`Error activating ${id}`);
    });

  const deactivate = (id: string, refresh: (data: any) => void) => axios.patch(`${environment.apiUrl}/client/${id}/deactivate`)
    .then(response => {
      console.log(`Deactivated ${id}`);
      refresh(response.data);
    })
    .catch(error => {
      console.log(`Error deactivating ${id}`);
    });

  return (
    <Box>
      <Typography variant="h4">Clients</Typography>
      <Box pb={2} />
      <Grid<Client>
        startPage={startPage}
        pageSize={pageSize}
        url={`${environment.apiUrl}/client`}
        queryDefinitions={queryDefinitions}
        columnDefinitions={columnDefs}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="create">Create</Button>
    </Box>
  );
}
