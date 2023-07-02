import { useContext, useEffect, useState } from "react";
import { ExpenseCategory } from "../../../client/types/dictionaries/ExpenseCategory";
import { Link, useParams } from "react-router-dom";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import TpmClient from "../../../client/TpmClient";
import { Box, Button, Typography } from "@mui/material";

export const Details = () => {
  const [expenseCategory, setExpenseCategory] = useState<ExpenseCategory>({
    id: '',
    name: '',
    description: '',
    active: false
  });

  const { id } = useParams();

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    if (!id) return;

    TpmClient.getInstance()
      .expenseCategories()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setExpenseCategory(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Expense category', path: 'expense-category' },
            { label: response.name, path: `expense-category/${response.id}` },
          ]);
        },
        error: (error) => console.error(error)
      });
  }, []);

  const activate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .expenseCategories()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => setExpenseCategory({ ...expenseCategory, active: response.active }),
        error: (error) => console.error(error)
      });
  }

  const deactivate = () => {
    if (!id) return;

    TpmClient.getInstance()
      .expenseCategories()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => setExpenseCategory({ ...expenseCategory, active: response.active }),
        error: (error) => console.error(error)
      });
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{expenseCategory.name}</Typography>

      <Typography variant="h5" gutterBottom>Description</Typography>
      <Typography variant="body1" gutterBottom>{expenseCategory.description}</Typography>

      <Typography variant="h5" gutterBottom>Details</Typography>
      <Typography variant="body1">Id: {expenseCategory.id}</Typography>
      <Typography variant="body1" gutterBottom>Active: {expenseCategory.active ? 'Yes' : 'No'}</Typography>

      <Typography variant="h5" gutterBottom>Actions</Typography>

      <Box component="span" pr={2}>
        <Button variant="contained" color="primary" component={Link} to={`${expenseCategory.id}/edit`}>Edit</Button>
      </Box>
      <Box component="span" pr={2}>
        {
          expenseCategory.active ? 
            <Button variant="contained" color="secondary" onClick={deactivate}>Deactivate</Button> :
            <Button variant="contained" color="secondary" onClick={activate}>Activate</Button>
        }
      </Box>
    </Box>
  );
};
