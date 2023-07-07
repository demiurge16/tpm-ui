import { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ExpenseCategories } from "./ExpenseCategories";
import { GridHandle } from "../../../components/grid/GridProps";
import { ExpenseCategory } from "../../../client/types/dictionaries/ExpenseCategory";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import TpmClient from "../../../client/TpmClient";
import { FilterDefinition } from "../../../components/grid/FilterDefinition";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Grid } from "../../../components/grid/Grid";
import { SnackbarContext } from "../../../contexts/SnackbarContext";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Expense categories', path: '/expense-categories' }
    ]);
  }, []);

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Id",
      field: "id",
      resizable: true,
      lockVisible: true,
      cellRenderer: (params: any) => {
        const expenseCategory = params.data as ExpenseCategory;
        return (
          <Box>
            <Button variant="text" component={Link} to={`${expenseCategory.id}`}>{expenseCategory.id}</Button>
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
        const expenseCategory = params.data as ExpenseCategory;

        const refresh = () => {
          gridRef.current?.refresh();
        };

        return (
          <Box>
            <Box component="span" pr={2}>
              <Button variant="text" startIcon={<EditIcon />} component={Link} to={`${expenseCategory.id}/edit`}>Edit</Button>
            </Box>

            {
              expenseCategory.active ?
                <Box component="span" pr={2}>
                  <Button variant="text" startIcon={<DeleteIcon />} onClick={() => deactivate(expenseCategory.id, refresh)}>Delete</Button>
                </Box> :
                <Box component="span" pr={2}>
                  <Button variant="text" startIcon={<RestoreFromTrashIcon />} onClick={() => activate(expenseCategory.id, refresh)}>Restore</Button>
                </Box>
            }
          </Box>
        );
      }
    }
  ]);

  const activate = (id: string, refresh: () => void) => {
    TpmClient.getInstance().expenseCategories().withId(id).activate()
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess("Success", `Activated ${id}`);
          refresh();
        },
        error: (error) => {
          snackbarContext.showError(`Error activating ${id}`, error.message);
        }
      });
  };

  const deactivate = (id: string, refresh: () => void) => {
    TpmClient.getInstance().expenseCategories().withId(id).deactivate()
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess("Success", `Deactivated ${id}`);
          refresh();
        },
        error: (error) => {
          snackbarContext.showError(`Error deactivating ${id}`, error.message);
        }
      });
  };

  const [filterDefs, setFilterDefs] = useState([
    FilterDefinition.string("name", "Name"),
    FilterDefinition.string("description", "Description"),
    FilterDefinition.boolean("active", "Active"),
  ]);

  return (
    <Box>
      <Typography variant="h4">{ExpenseCategories.title}</Typography>
      <Typography variant="subtitle1">{ExpenseCategories.description}</Typography>
      <Box pb={2} />
      <Grid<ExpenseCategory>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={TpmClient.getInstance().expenseCategories().all}
        filters={filterDefs}
        columnDefinitions={columnDefs}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="create">Create</Button>
    </Box>
  );
};
