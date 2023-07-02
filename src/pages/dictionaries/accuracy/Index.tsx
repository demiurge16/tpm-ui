import { useContext, useEffect, useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Accuracies } from "./Accuracies";
import { GridHandle } from "../../../components/grid/GridProps";
import { Accuracy } from "../../../client/types/dictionaries/Accuracy";
import { FilterDefinition } from "../../../components/grid/FilterDefinition";
import { Link } from "react-router-dom";
import TpmClient from "../../../client/TpmClient";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Grid } from "../../../components/grid/Grid";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Accuracies', path: '/accuracies' }
    ]);
  }, []);

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Id",
      field: "id",
      resizable: true,
      lockVisible: true,
      cellRenderer: (params: any) => {
        const accuracy = params.data as Accuracy;
        return (
          <Box>
            <Button variant="text" component={Link} to={`${accuracy.id}`}>{accuracy.id}</Button>
          </Box>
        );
      },
    },
    { headerName: "Name", field: "name", resizable: true },
    { headerName: "Description", field: "description", resizable: true },
    { headerName: "Active", field: "active", resizable: true },
    {
      headerName: "Actions",
      field: "actions",
      resizable: true,
      lockVisible: true,
      cellRenderer: (params: any) => {
        const accuracy = params.data as Accuracy;

        const refresh = () => {
          console.log('refreshing', accuracy);
          gridRef.current?.refresh();
        };

        return (
          <Box>
            <Box component="span" pr={2}>
              <Button variant="text" startIcon={<EditIcon />} component={Link} to={`${accuracy.id}/edit`}>Edit</Button>
            </Box>

            {
              accuracy.active ?
                <Box component="span" pr={2}>
                  <Button variant="text" startIcon={<DeleteIcon />} onClick={() => deactivate(accuracy.id, refresh)}>Delete</Button>
                </Box> :
                <Box component="span" pr={2}>
                  <Button variant="text" startIcon={<RestoreFromTrashIcon />} onClick={() => activate(accuracy.id, refresh)}>Restore</Button>
                </Box>
            }
          </Box>
        );
      }
    }
  ]);

  const activate = (id: string, refresh: () => void) => 
    TpmClient.getInstance().accuracies().withId(id).activate()
      .subscribe({
        next: (response) => {
          console.log(`Activated ${id}`);
          refresh();
        },
        error: (error) => {
          console.error(`Error activating ${id}`);
        }
      });

  const deactivate = (id: string, refresh: () => void) => 
    TpmClient.getInstance().accuracies().withId(id).deactivate()
      .subscribe({
        next: (response) => {
          console.log(`Deactivated ${id}`);
          refresh();
        },
        error: (error) => {
          console.error(`Error deactivating ${id}`);
        }
      });

  const [filterDefs, setFilterDefs] = useState<FilterDefinition[]>([
    FilterDefinition.string("name", "Name"),
    FilterDefinition.string("description", "Description"),
    FilterDefinition.boolean("active", "Active")
  ]);

  return (
    <Box>
      <Typography variant="h4">{Accuracies.title}</Typography>
      <Typography variant="subtitle1">{Accuracies.description}</Typography>
      <Box pb={2} />
      <Grid<Accuracy>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={TpmClient.getInstance().accuracies().all}
        filters={filterDefs}
        columnDefinitions={columnDefs}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="create">Create</Button>
    </Box>
  );
};
