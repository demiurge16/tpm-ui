import { useEffect, useState } from "react";
import { ExpenseCategory } from "../../../client/types/dictionaries/ExpenseCategory";
import { Link, useParams } from "react-router-dom";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { useTpmClient } from "../../../contexts/TpmClientContext";
import { LoadingScreen } from "../../utils/LoadingScreen";

export const Details = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [expenseCategory, setExpenseCategory] = useState<ExpenseCategory>({} as ExpenseCategory);

  const { id } = useParams();
  const tpmClient = useTpmClient();

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();;
  
  useEffect(() => {
    if (!id) return;

    tpmClient.expenseCategories()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setExpenseCategory(response);
          setBreadcrumbs([
            { label: 'Expense category', path: 'expense-category' },
            { label: response.name, path: `expense-category/${response.id}` },
          ]);
          setLoading(false);
        },
        error: (error) => showError(`Error loading expense category ${id}`, error.message)
      });
  }, [id, setBreadcrumbs, showError, tpmClient]);

  const activate = () => {
    if (!id) return;

    tpmClient.expenseCategories()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => {
          showSuccess("Success", `Expense category ${id} activated`);
          setExpenseCategory({ ...expenseCategory, active: response.active });
        },
        error: (error) => showError(`Error activating expense category ${id}`, error.message)
      });
  }

  const deactivate = () => {
    if (!id) return;

    tpmClient.expenseCategories()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => {
          showSuccess("Success", `Expense category ${id} deactivated`);
          setExpenseCategory({ ...expenseCategory, active: response.active });
        },
        error: (error) => showError(`Error deactivating expense category ${id}`, error.message)
      });
  }

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4" gutterBottom>{expenseCategory.name}</Typography>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Description</Typography>
        <Typography variant="body1" gutterBottom>{expenseCategory.description}</Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Details</Typography>
        <Typography variant="body1">Id: {expenseCategory.id}</Typography>
        <Typography variant="body1" gutterBottom>Active: {expenseCategory.active ? 'Yes' : 'No'}</Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Actions</Typography>

        <Box component="span" pr={2}>
          <Button variant="contained" color="primary" component={Link} to="edit">Edit</Button>
        </Box>
        <Box component="span" pr={2}>
          {
            expenseCategory.active ? 
              <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button> :
              <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
          }
        </Box>
      </Paper>
    </Box>
  );
};
