import { Box, Button, Typography } from "@mui/material";
import { ColDef, ColGroupDef, GridApi } from "ag-grid-community";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid } from "../../components/grid/Grid";
import { FilterDefinition } from "../../components/grid/FilterDefinition";
import { forkJoin } from "rxjs";
import TpmClient from "../../client/TpmClient";
import { Client, ClientStatus } from "../../client/types/client/Client";
import { ClientType } from "../../client/types/client/ClientType";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const [columnDefs, setColumnDefs] = useState<Array<ColDef<Client> | ColGroupDef<Client>>>([]);
  const [filters, setFilters] = useState<FilterDefinition[]>([]);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

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
                      to={`${clientType.id}/edit`}
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

        setFilters([
          FilterDefinition.string("id", "Id"),
          FilterDefinition.string("name", "Name"),
          FilterDefinition.string("email", "Email"),
          FilterDefinition.string("phone", "Phone"),
          FilterDefinition.string("address", "Address"),
          FilterDefinition.string("city", "City"),
          FilterDefinition.string("state", "State"),
          FilterDefinition.string("zip", "Zip"),
          FilterDefinition.select(
            "country.code",
            "Country",
            countries.items.map((c) => ({ value: c.code, label: c.name }))
          ),
          FilterDefinition.string("vat", "VAT"),
          FilterDefinition.select(
            "type.id.value",
            "Type",
            types.items.map((t) => ({ value: t.id, label: t.name }))
          ),
          FilterDefinition.boolean("active", "Active"),
        ]);

        breadcrumbsContext.setBreadcrumbs([
          { label: "Clients", path: "/clients" },
        ]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }, [breadcrumbsContext]);

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
          console.error(`Error activating ${id}`);
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
          console.error(`Error deactivating ${id}`);
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
        filters={filters}
        columnDefinitions={columnDefs}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="create">
        Create
      </Button>
    </Box>
  );
};
