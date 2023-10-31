import { useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ExpenseCategories } from "./ExpenseCategories";
import { GridHandle } from "../../../components/grid/GridProps";
import { ExpenseCategory } from "../../../client/types/dictionaries/ExpenseCategory";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { FilterDefinition } from "../../../components/grid/FilterDefinition";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Grid } from "../../../components/grid/Grid";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { applicationClient } from "../../../client/ApplicationClient";

const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Expense categories', path: '/expense-categories' }
    ]);
  }, [setBreadcrumbs]);

  const columnDefs = [
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
  ];

  const activate = (id: string, refresh: () => void) => {
    applicationClient.expenseCategories().withId(id).activate()
      .subscribe({
        next: () => {
          showSuccess("Success", `Activated ${id}`);
          refresh();
        },
        error: (error) => {
          showError(`Error activating ${id}`, error.message);
        }
      });
  };

  const deactivate = (id: string, refresh: () => void) => {
    applicationClient.expenseCategories().withId(id).deactivate()
      .subscribe({
        next: () => {
          showSuccess("Success", `Deactivated ${id}`);
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
      <Typography variant="h4">{ExpenseCategories.title}</Typography>
      <Typography variant="subtitle1">{ExpenseCategories.description}</Typography>
      <Box pb={2} />
      <Grid<ExpenseCategory>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={applicationClient.expenseCategories().all}
        exportData={applicationClient.expenseCategories().export}
        filters={filterDefs}
        columnDefinitions={columnDefs}
        elevation={2}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="create">Create</Button>
    </Box>
  );
};

export default Index;
