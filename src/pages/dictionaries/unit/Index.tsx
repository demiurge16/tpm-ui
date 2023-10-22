import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Units } from "./Units";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Unit } from "../../../client/types/dictionaries/Unit";
import { Link } from "react-router-dom";
import { ColumnDefinition, GridHandle } from "../../../components/grid/GridProps";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { FilterDefinition } from "../../../components/grid/FilterDefinition";
import { Grid } from "../../../components/grid/Grid";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { useTpmClient } from "../../../contexts/TpmClientContext";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;
  
  const gridRef = useRef<GridHandle>(null);
  const [columnDefs, setColumnDefs] = useState<Array<ColumnDefinition<Unit>>>([]);
  const [filters, setFilters] = useState<FilterDefinition[]>([]);

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();;
  const tpmClient = useTpmClient();

  useEffect(() => {
    const activate = (id: string, refresh: () => void) => {
      tpmClient.priorities().withId(id).activate()
        .subscribe({
          next: () => {
            showSuccess('Success', `Activated ${id}`);
            refresh();
          },
          error: (error) => {
            showError(`Error activating ${id}`, error.message);
          }
        });
    };
  
    const deactivate = (id: string, refresh: () => void) => {
      tpmClient.priorities().withId(id).deactivate()
        .subscribe({
          next: () => {
            showSuccess('Success', `Deactivated ${id}`);
            refresh();
          },
          error: (error) => {
            showError(`Error deactivating ${id}`, error.message);
          }
        });
    };

    tpmClient.units()
      .refdata()
      .measurements()
      .subscribe({
        next: (response) => {
          setFilters([
            FilterDefinition.uniqueToken("id", "Id"),
            FilterDefinition.string("name", "Name"),
            FilterDefinition.number("volume", "Volume"),
            FilterDefinition.select(
              "measurement",
              "Measurement",
              response.map(m => ({ label: m.name, value: m.code }))
            ),
            FilterDefinition.boolean("active", "Active")
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
          showError("Error loading units", error);
        }
      });
      
    setBreadcrumbs([
      { label: 'Units', path: '/units' }
    ]);
  }, [setBreadcrumbs, showError, showSuccess, tpmClient]);

  return (
    <Box>
      <Typography variant="h4">{Units.title}</Typography>
      <Typography variant="subtitle1">{Units.description}</Typography>
      <Box pb={2} />
      <Grid<Unit>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={tpmClient.units().all}
        exportData={tpmClient.units().export}
        filters={filters}
        columnDefinitions={columnDefs}
        elevation={2}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="create">
        Create
      </Button>
    </Box>
  );
};
