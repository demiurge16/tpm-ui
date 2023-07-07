import { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Units } from "./Units";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Unit } from "../../../client/types/dictionaries/Unit";
import { Link } from "react-router-dom";
import { ColumnDefinition, GridHandle } from "../../../components/grid/GridProps";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import TpmClient from "../../../client/TpmClient";
import { FilterDefinition } from "../../../components/grid/FilterDefinition";
import { Grid } from "../../../components/grid/Grid";
import { SnackbarContext } from "../../../contexts/SnackbarContext";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;
  
  const gridRef = useRef<GridHandle>(null);
  const [columnDefs, setColumnDefs] = useState<Array<ColumnDefinition<Unit>>>([]);
  const [filters, setFilters] = useState<FilterDefinition[]>([]);

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    TpmClient.getInstance()
      .units()
      .refdata()
      .measurements()
      .subscribe({
        next: (response) => {
          setFilters([
            FilterDefinition.string("name", "Name"),
            FilterDefinition.string("description", "Description"),
            FilterDefinition.boolean("active", "Active"),
            FilterDefinition.select(
              "measurement",
              "Measurement",
              response.map(m => ({ label: m.name, value: m.code }))
            )
          ]);

          setColumnDefs([
            {
              headerName: "Id",
              field: "id",
              resizable: true,
              lockVisible: true,
              cellRenderer: (params: any) => {
                const priority = params.data as Unit;
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
            { headerName: "Volume", field: "volume", resizable: true },
            { 
              headerName: "Measurement",
              field: "measurement",
              resizable: true,
              cellRenderer: (params: any) => params.value.name
            },
            {
              headerName: "Actions",
              field: "actions",
              resizable: true,
              lockVisible: true,
              cellRenderer: (params: any) => {
                const priority = params.data as Unit;
        
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
          ]);
        },
        error: (error) => {
          snackbarContext.showError("Error loading units", error);
        }
      });
      
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Units', path: '/units' }
    ]);
  }, []);

  const activate = (id: string, refresh: () => void) => {
    TpmClient.getInstance().priorities().withId(id).activate()
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess('Success', `Activated ${id}`);
          refresh();
        },
        error: (error) => {
          snackbarContext.showError(`Error activating ${id}`, error.message);
        }
      });
  };

  const deactivate = (id: string, refresh: () => void) => {
    TpmClient.getInstance().priorities().withId(id).deactivate()
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess('Success', `Deactivated ${id}`);
          refresh();
        },
        error: (error) => {
          snackbarContext.showError(`Error deactivating ${id}`, error.message);
        }
      });
  };

  return (
    <Box>
      <Typography variant="h4">{Units.title}</Typography>
      <Typography variant="subtitle1">{Units.description}</Typography>
      <Box pb={2} />
      <Grid<Unit>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={TpmClient.getInstance().units().all}
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
