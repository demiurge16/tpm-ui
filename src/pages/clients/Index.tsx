import { Box, Button, Typography } from "@mui/material";
import { ColDef, ColGroupDef, GridApi } from "ag-grid-community";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Field } from "../../components/grid/Field";
import { Grid } from "../../components/grid/Grid";
import { QueryableColumnDefinition } from "../../components/grid/QueryableColumnDefinition";
import { forkJoin } from "rxjs";
import TpmClient from "../../client/TpmClient";
import { Client, ClientStatus } from "../../client/types/client/Client";
import { ClientType } from "../../client/types/client/ClientType";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const [columnDefs, setColumnDefs] = useState<Array<ColDef<Client> | ColGroupDef<Client>>>([]);

  const [queryDefinitions, setQueryDefinitions] = useState<Array<QueryableColumnDefinition>>([]);

  useEffect(() => {
    forkJoin({
      countries: TpmClient.getInstance().countries().all(),
      types: TpmClient.getInstance().clientTypes().all(),
    }).subscribe({
      next: (data) => {
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
            valueFormatter: (params) => params.value.name,
          },
          { headerName: "VAT", field: "vat", resizable: true },
          {
            headerName: "Type",
            field: "type",
            resizable: true,
            valueFormatter: (params) => params.value.name,
          },
          { headerName: "Active", field: "active", resizable: true },
          {
            headerName: "Actions",
            field: "actions",
            resizable: true,
            cellRenderer: (params: any) => {
              const clientType = params.data as ClientType;
              const gridApi = params.api as GridApi;

              const refresh = (data: ClientStatus) => {
                const rowNode = gridApi.getRowNode(params.rowIndex);

                if (rowNode) {
                  rowNode.setDataValue("active", data.active);
                  gridApi.refreshCells({ force: true });
                }
              };

              return (
                <Box>
                  <Box component="span" pr={2}>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`edit/${clientType.id}`}
                    >
                      Edit
                    </Button>
                  </Box>

                  {clientType.active ? (
                    <Box component="span" pr={2}>
                      <Button
                        variant="contained"
                        onClick={() =>
                          deactivate(clientType.id, (data) => refresh(data))
                        }
                      >
                        Deactivate
                      </Button>
                    </Box>
                  ) : (
                    <Box component="span" pr={2}>
                      <Button
                        variant="contained"
                        onClick={() =>
                          activate(clientType.id, (data) => refresh(data))
                        }
                      >
                        Activate
                      </Button>
                    </Box>
                  )}
                </Box>
              );
            },
          },
        ]);

        const { countries, types } = data;

        setQueryDefinitions([
          {
            id: "id",
            name: "Id",
            filter: true,
            type: Field.STRING,
          },
          {
            id: "name",
            name: "Name",
            filter: true,
            type: Field.STRING,
          },
          {
            id: "email",
            name: "Email",
            filter: true,
            type: Field.STRING,
          },
          {
            id: "phone",
            name: "Phone",
            filter: true,
            type: Field.STRING,
          },
          {
            id: "address",
            name: "Address",
            filter: true,
            type: Field.STRING,
          },
          {
            id: "city",
            name: "City",
            filter: true,
            type: Field.STRING,
          },
          {
            id: "state",
            name: "State",
            filter: true,
            type: Field.STRING,
          },
          {
            id: "zip",
            name: "Zip",
            filter: true,
            type: Field.STRING,
          },
          {
            id: "country.code",
            name: "Country",
            filter: true,
            type: Field.SELECT,
            options: countries.items.map((c) => ({
              value: c.code,
              label: c.name,
            })),
          },
          {
            id: "vat",
            name: "VAT",
            filter: true,
            type: Field.STRING,
          },
          {
            id: "type.id.value",
            name: "Type",
            filter: true,
            type: Field.SELECT,
            options: types.items.map((t) => ({ value: t.id, label: t.name })),
          },
          {
            id: "active",
            name: "Active",
            filter: true,
            type: Field.BOOLEAN,
          },
        ]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }, []);

  const activate = (id: string,refresh: (data: ClientStatus) => void) =>
    TpmClient.getInstance()
      .clients()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => {
          console.log(`Activated ${id}`);
          refresh(response);
        },
        error: (error) => {
          console.log(`Error activating ${id}`);
        },
      });

  const deactivate = (id: string, refresh: (data: ClientStatus) => void) =>
    TpmClient.getInstance()
      .clients()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => {
          console.log(`Deactivated ${id}`);
          refresh(response);
        },
        error: (error) => {
          console.log(`Error deactivating ${id}`);
        },
      });

  return (
    <Box>
      <Typography variant="h4">Clients</Typography>
      <Box pb={2} />
      <Grid<Client>
        startPage={startPage}
        pageSize={pageSize}
        fetch={TpmClient.getInstance().clients().all}
        queryDefinitions={queryDefinitions}
        columnDefinitions={columnDefs}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="create">
        Create
      </Button>
    </Box>
  );
};
