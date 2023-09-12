import { useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ServiceTypes } from "./ServiceTypes";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Priority } from "../../../client/types/dictionaries/Priority";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { GridHandle } from "../../../components/grid/GridProps";
import { FilterDefinition } from "../../../components/grid/FilterDefinition";
import { Grid } from "../../../components/grid/Grid";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { ServiceType } from "../../../client/types/dictionaries/ServiceType";
import { useTpmClient } from "../../../contexts/TpmClientContext";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();;
  const tpmClient = useTpmClient();

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Service types', path: '/service-types' }
    ]);
  }, [setBreadcrumbs]);

  const columnDefs = [
    {
      headerName: "Id",
      field: "id",
      resizable: true,
      lockVisible: true,
      cellRenderer: (params: any) => {
        const priority = params.data as Priority;
        return (
          <Box>
            <Button variant="text" component={Link} to={`${priority.id}`}>{priority.id}</Button>
          </Box>
        );
      },
    },
    { headerName: "Name", field: "name", resizable: true },
    { headerName: "Description", field: "description", resizable: true },
    { headerName: "Active", field: "active", resizable: true },
    { headerName: "Value", field: "value", resizable: true },
    { headerName: "Emoji", field: "emoji", resizable: true },
    {
      headerName: "Actions",
      field: "actions",
      resizable: true,
      lockVisible: true,
      cellRenderer: (params: any) => {
        const priority = params.data as Priority;

        const refresh = () => {
          gridRef.current?.refresh();
        };

        return (
          <Box>
            <Box component="span" pr={2}>
              <Button variant="text" startIcon={<EditIcon />} component={Link} to={`${priority.id}/edit`}>Edit</Button>
            </Box>

            {
              priority.active ?
                <Box component="span" pr={2}>
                  <Button variant="text" startIcon={<DeleteIcon />} onClick={() => deactivate(priority.id, refresh)}>Delete</Button>
                </Box> :
                <Box component="span" pr={2}>
                  <Button variant="text" startIcon={<RestoreFromTrashIcon />} onClick={() => activate(priority.id, refresh)}>Restore</Button>
                </Box>
            }
          </Box>
        );
      }
    }
  ];

  const activate = (id: string, refresh: () => void) => {
    tpmClient.serviceTypes().withId(id).activate()
      .subscribe({
        next: (response) => {
          showSuccess('Success', `Activated ${id}`);
          refresh();
        },
        error: (error) => {
          showError(`Error activating ${id}`, error.message);
        }
      });
  };

  const deactivate = (id: string, refresh: () => void) => {
    tpmClient.serviceTypes().withId(id).deactivate()
      .subscribe({
        next: (response) => {
          showSuccess('Success', `Deactivated ${id}`);
          refresh();
        },
        error: (error) => {
          showError(`Error deactivating ${id}`, error.message);
        }
      });
  };

  const filterDefs = [
    FilterDefinition.uniqueToken("id", "Id"),
    FilterDefinition.string("name", "Name"),
    FilterDefinition.boolean("active", "Active")
  ];

  return (
    <Box>
      <Typography variant="h4">{ServiceTypes.title}</Typography>
      <Typography variant="subtitle1">{ServiceTypes.description}</Typography>
      <Box pb={2} />
      <Grid<ServiceType>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={tpmClient.serviceTypes().all}
        exportData={tpmClient.serviceTypes().export}
        filters={filterDefs}
        columnDefinitions={columnDefs}
        elevation={2}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="create">Create</Button>
    </Box>
  );
};
