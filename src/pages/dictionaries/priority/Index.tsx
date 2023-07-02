import { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Priorities } from "./Priorities";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Priority } from "../../../client/types/dictionaries/Priority";
import { Link } from "react-router-dom";
import TpmClient from "../../../client/TpmClient";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { GridHandle } from "../../../components/grid/GridProps";
import { FilterDefinition } from "../../../components/grid/FilterDefinition";
import { Grid } from "../../../components/grid/Grid";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Priorities', path: '/priorities' }
    ]);
  }, []);

  const [columnDefs, setColumnDefs] = useState([
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
  ]);

  const activate = (id: string, refresh: () => void) => {
    TpmClient.getInstance().priorities().withId(id).activate()
      .subscribe({
        next: (response) => {
          console.log(`Activated ${id}`);
          refresh();
        },
        error: (error) => {
          console.error(`Error activating ${id}`);
        }
      });
  };

  const deactivate = (id: string, refresh: () => void) => {
    TpmClient.getInstance().priorities().withId(id).deactivate()
      .subscribe({
        next: (response) => {
          console.log(`Deactivated ${id}`);
          refresh();
        },
        error: (error) => {
          console.error(`Error deactivating ${id}`);
        }
      });
  };

  const [filterDefs, setFilterDefs] = useState([
    FilterDefinition.string("name", "Name"),
    FilterDefinition.string("description", "Description"),
    FilterDefinition.boolean("active", "Active")
  ]);

  return (
    <Box>
      <Typography variant="h4">{Priorities.title}</Typography>
      <Typography variant="subtitle1">{Priorities.description}</Typography>
      <Box pb={2} />
      <Grid<Priority>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={TpmClient.getInstance().priorities().all}
        filters={filterDefs}
        columnDefinitions={columnDefs}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="create">Create</Button>
    </Box>
  );
};
