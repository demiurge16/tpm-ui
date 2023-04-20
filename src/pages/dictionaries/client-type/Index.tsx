import { useState } from 'react';
import { Box, Button, Typography } from "@mui/material";
import { Field } from "../../../components/grid/Field";
import { Grid } from "../../../components/grid/Grid";
import { environment } from "../../../Environment";
import { ClientType } from "./types/ClientType";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GridApi } from 'ag-grid-community';

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Id", field: "id", resizable: true },
    { headerName: "Name", field: "name", resizable: true },
    { headerName: "Active", field: "active", resizable: true },
    { headerName: "Corporate", field: "corporate", resizable: true },
    { headerName: "Description", field: "description", resizable: true },
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

  const activate = (id: string, refresh: (data: any) => void) => axios.patch(`${environment.apiUrl}/client-type/${id}/activate`)
    .then(response => {
      console.log(`Activated ${id}`);
      refresh(response.data);
    })
    .catch(error => {
      console.log(`Error activating ${id}`);
    });

  const deactivate = (id: string, refresh: (data: any) => void) => axios.patch(`${environment.apiUrl}/client-type/${id}/deactivate`)
    .then(response => {
      console.log(`Deactivated ${id}`);
      refresh(response.data);
    })
    .catch(error => {
      console.log(`Error deactivating ${id}`);
    });

  const [queryDefinitions, setQueryDefinitions] = useState([
    {
      id: "id",
      name: "Id",
      filter: true,
      sortable: false,
      type: Field.STRING
    },
    {
      id: "name",
      name: "Name",
      filter: true,
      sortable: true,
      type: Field.STRING
    },
    {
      id: "active",
      name: "Active",
      filter: true,
      sortable: false,
      type: Field.BOOLEAN
    },
    {
      id: "corporate",
      name: "Corporate",
      filter: true,
      sortable: false,
      type: Field.BOOLEAN
    },
    {
      id: "description",
      name: "Description",
      filter: true,
      sortable: false,
      type: Field.STRING
    }
  ]);

  return (
    <Box>
      <Typography variant="h4">Client types</Typography>
      <Box pb={2} />
      <Grid<ClientType>
        startPage={startPage}
        pageSize={pageSize}
        url={`${environment.apiUrl}/client-type`}
        queryDefinitions={queryDefinitions}
        columnDefinitions={columnDefs}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="create">Create</Button>
    </Box>
  );
}