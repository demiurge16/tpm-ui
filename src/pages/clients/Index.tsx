import { Box, Button, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Grid } from "../../components/grid/Grid";
import { FilterDefinition } from "../../components/grid/FilterDefinition";
import { forkJoin } from "rxjs";
import { Client, ClientStatus } from "../../client/types/client/Client";
import { ClientType } from "../../client/types/client/ClientType";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { ColumnDefinition, GridHandle } from "../../components/grid/GridProps";
import { Clients } from "./Clients";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { useTpmClient } from "../../contexts/TpmClientContext";
import { LoadingScreen } from "../utils/LoadingScreen";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const [columnDefs, setColumnDefs] = useState<Array<ColumnDefinition<Client>>>([]);
  const [filters, setFilters] = useState<FilterDefinition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const snackbarContext = useContext(SnackbarContext);
  const tpmClient = useTpmClient();
  const gridRef = useRef<GridHandle>(null);

  useEffect(() => {
    forkJoin({
      countries: tpmClient.countries().all(),
      types: tpmClient.clientTypes().all(),
    }).subscribe({
      next: (data) => {
        setColumnDefs([
          {
            headerName: "Id",
            field: "id",
            resizable: true,
            sortable: true,
            lockVisible: true,
            cellRenderer: (params: any) => {
              const client = params.data as Client;
              return (
                <Box>
                  <Button variant="text" component={Link} to={`${client.id}`}>
                    {client.id}
                  </Button>
                </Box>
              );
            }
          },
          { headerName: "Name", field: "name", resizable: true, sortable: true },
          { headerName: "Email", field: "email", resizable: true, sortable: true },
          { headerName: "Phone", field: "phone", resizable: true, sortable: true },
          { headerName: "Address", field: "address", resizable: true, hide: true, sortable: true },
          { headerName: "City", field: "city", resizable: true, sortable: true, hide: true },
          { headerName: "State", field: "state", resizable: true, sortable: true, hide: true },
          { headerName: "Zip", field: "zip", resizable: true, sortable: true, hide: true },
          {
            headerName: "Country",
            field: "country",
            resizable: true,
            valueFormatter: (params) => params.value.name,
            hide: true,
          },
          { headerName: "VAT", field: "vat", resizable: true, hide: true },
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
            lockVisible: true,
            cellRenderer: (params: any) => {
              const clientType = params.data as ClientType;

              const refresh = () => {
                gridRef.current?.refresh();
              };

              return (
                <Box>
                  <Box component="span" pr={2}>
                    <Button variant="text" startIcon={<EditIcon />} component={Link} to={`${clientType.id}/edit`}>
                      Edit
                    </Button>
                  </Box>

                  {clientType.active ? (
                    <Box component="span" pr={2}>
                      <Button variant="text" startIcon={<DeleteIcon />} onClick={() => deactivate(clientType.id, refresh)}>
                        Deactivate
                      </Button>
                    </Box>
                  ) : (
                    <Box component="span" pr={2}>
                      <Button variant="text" startIcon={<RestoreFromTrashIcon />} onClick={() => activate(clientType.id, refresh)}>
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
          FilterDefinition.uniqueToken("id", "Id"),
          FilterDefinition.string("name", "Name"),
          FilterDefinition.string("email", "Email"),
          FilterDefinition.string("phone", "Phone"),
          FilterDefinition.string("address", "Address"),
          FilterDefinition.string("city", "City"),
          FilterDefinition.string("state", "State"),
          FilterDefinition.string("zip", "Zip"),
          FilterDefinition.select(
            "countryCode",
            "Country",
            countries.items.map((c) => ({ value: c.code, label: c.name.official }))
          ),
          FilterDefinition.string("vat", "VAT"),
          FilterDefinition.select(
            "clientTypeId",
            "Type",
            types.items.map((t) => ({ value: t.id, label: t.name }))
          ),
          FilterDefinition.boolean("active", "Active"),
        ]);

        breadcrumbsContext.setBreadcrumbs([
          { label: "Clients", path: "/clients" },
        ]);

        setLoading(false);
      },
      error: (error) => {
        snackbarContext.showError("Error fetching client types", error.message);
      },
    });
  }, []);

  const activate = (id: string,refresh: (data: ClientStatus) => void) =>
    tpmClient.clients()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess("Success", `Activated ${id}`);
          refresh(response);
        },
        error: (error) => {
          snackbarContext.showError(`Error activating ${id}`, error.message);
        },
      });

  const deactivate = (id: string, refresh: (data: ClientStatus) => void) =>
    tpmClient.clients()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess("Success", `Deactivated ${id}`);
          refresh(response);
        },
        error: (error) => {
          snackbarContext.showError(`Error deactivating ${id}`, error.message);
        },
      });

  return (
    <Box>
      <Typography variant="h4">{Clients.title}</Typography>
      <Typography variant="subtitle1">{Clients.description}</Typography>
      <Box pb={2} />

      {
        loading ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <LoadingScreen />
          </Paper>
        ) : (
          <>
            <Grid<Client>
              innerRef={gridRef}
              startPage={startPage}
              pageSize={pageSize}
              fetch={tpmClient.clients().all}
              export={tpmClient.clients().export}
              filters={filters}
              columnDefinitions={columnDefs}
              elevation={2}
            />
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Button variant="contained" component={Link} to="create">
                Create new client
              </Button>
            </Paper>
          </>
        )
      }
    </Box>
  );
};
