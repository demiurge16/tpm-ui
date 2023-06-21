import { useContext, useEffect, useState } from 'react';
import { Box, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { GridApi } from 'ag-grid-community';
import TpmClient from '../../../client/TpmClient';
import { Grid } from '../../../components/grid/Grid';
import { ClientType, ClientTypeStatus } from '../../../client/types/client/ClientType';
import { BreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';

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

        const refresh = (data: ClientTypeStatus) => {
          const rowNode = gridApi.getRowNode(params.rowIndex);

          if (rowNode) {
            rowNode.setDataValue('active', data.active);
            gridApi.refreshCells({ force: true });
          }
        };

        return (
          <Box>
            <Box component="span" pr={2}>
              <Button variant="contained" component={Link} to={`${clientType.id}/edit`}>Edit</Button>
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

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Client types', path: '/client-types' }
    ]);
  }, [breadcrumbsContext]);


  const activate = (id: string, refresh: (data: ClientTypeStatus) => void) => 
    TpmClient.getInstance().clientTypes().withId(id).activate()
      .subscribe({
        next: (response) => {
          console.log(`Activated ${id}`);
          refresh(response);
        },
        error: (error) => {
          console.error(`Error activating ${id}`);
        }
      });

  const deactivate = (id: string, refresh: (data: ClientTypeStatus) => void) => 
    TpmClient.getInstance().clientTypes().withId(id).deactivate()
      .subscribe({
        next: (response) => {
          console.log(`Deactivated ${id}`);
          refresh(response);
        },
        error: (error) => {
          console.error(`Error deactivating ${id}`);
        }
      });

  const [filters, setFilters] = useState<FilterDefinition[]>([
    FilterDefinition.string('id', 'Id'),
    FilterDefinition.string('name', 'Name'),
    FilterDefinition.boolean('active', 'Active'),
    FilterDefinition.boolean('corporate', 'Corporate'),
    FilterDefinition.string('description', 'Description')
  ]);

  return (
    <Box>
      <Typography variant="h4">Client types</Typography>
      <Box pb={2} />
      <Grid<ClientType>
        startPage={startPage}
        pageSize={pageSize}
        fetch={TpmClient.getInstance().clientTypes().all}
        filters={filters}
        columnDefinitions={columnDefs}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="create">Create</Button>
    </Box>
  );
}
