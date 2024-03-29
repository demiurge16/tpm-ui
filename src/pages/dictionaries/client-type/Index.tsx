import { useEffect, useRef } from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { Grid } from '../../../components/grid/Grid';
import { ClientType, ClientTypeStatus } from '../../../client/types/client/ClientType';
import { useBreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { ClientTypes } from './ClientTypes';
import { GridHandle } from '../../../components/grid/GridProps';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { useSnackbarContext } from '../../../contexts/SnackbarContext';
import { applicationClient } from '../../../client/ApplicationClient';

const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();
  useEffect(() => {
    setBreadcrumbs([
      { label: 'Client types', path: '/client-types' }
    ]);
  }, [setBreadcrumbs]);

  const columnDefs = [
    {
      headerName: "Id",
      field: "id",
      resizable: true,
      lockVisible: true,
      cellRenderer: (params: any) => {
        const clientType = params.data as ClientType;
        return (
          <Box>
            <Button variant="text" component={Link} to={`${clientType.id}`}>{clientType.id}</Button>
          </Box>
        );
      },
    },
    { headerName: "Name", field: "name", resizable: true },
    { headerName: "Active", field: "active", resizable: true },
    { headerName: "Corporate", field: "corporate", resizable: true },
    { headerName: "Description", field: "description", resizable: true },
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
              <Button variant="text" startIcon={<EditIcon />} component={Link} to={`${clientType.id}/edit`}>Edit</Button>
            </Box>

            {
              clientType.active ?
                <Box component="span" pr={2}>
                  <Button variant="text" startIcon={<DeleteIcon />} onClick={() => deactivate(clientType.id, refresh)}>Deactivate</Button>
                </Box>
                :
                <Box component="span" pr={2}>
                  <Button variant="text" startIcon={<RestoreFromTrashIcon />} onClick={() => activate(clientType.id, refresh)}>Activate</Button>
                </Box>
            }
          </Box>
        );
      }
    }
  ];

  const activate = (id: string, refresh: (data: ClientTypeStatus) => void) => 
    applicationClient.clientTypes().withId(id).activate()
      .subscribe({
        next: (response) => {
          showSuccess("Success", `Activated ${id}`);
          refresh(response);
        },
        error: (error) => {
          showError(`Error activating ${id}`, error.message);
        }
      });

  const deactivate = (id: string, refresh: (data: ClientTypeStatus) => void) => 
    applicationClient.clientTypes().withId(id).deactivate()
      .subscribe({
        next: (response) => {
          showSuccess("Success", `Deactivated ${id}`);
          refresh(response);
        },
        error: (error) => {
          showError(`Error deactivating ${id}`, error.message);
        }
      });

  const filters = [
    FilterDefinition.uniqueToken('id', 'Id'),
    FilterDefinition.string('name', 'Name'),
    FilterDefinition.boolean('active', 'Active'),
    FilterDefinition.boolean('corporate', 'Corporate')
  ];

  return (
    <Box>
      <Typography variant="h4">{ClientTypes.title}</Typography>
      <Typography variant="subtitle1">{ClientTypes.description}</Typography>
      <Box pb={2} />
      <Grid<ClientType>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={applicationClient.clientTypes().all}
        exportData={applicationClient.clientTypes().export}
        filters={filters}
        columnDefinitions={columnDefs}
        elevation={2}
      />
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Button variant="contained" component={Link} to="create">
          Create new client type
        </Button>
      </Paper>
    </Box>
  );
}

export default Index;
