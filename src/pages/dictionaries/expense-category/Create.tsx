import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateExpenseCategory } from "../../../client/types/dictionaries/ExpenseCategory";
import TpmClient from "../../../client/TpmClient";
import { Box, Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Expense category', path: '/expense-category' },
      { label: 'Create', path: '/expense-category/create' }
    ]);
  }, []);

  const handleSubmit = (data: CreateExpenseCategory) =>
    TpmClient.getInstance()
      .expenseCategories()
      .create(data)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess("Success", "Expense category created");
          navigate("/expense-categories");
        },
        error: (error) => {
          snackbarContext.showError("Error creating expense category", error.message);
          setServerError(error.message);
        }
      });

  return (
    <Box>
      <Typography variant="h4">Create new expense category</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={{ name: '', description: '' }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField name="name" label="Name" required />
            <TextField name="description" label="Description" multiline rows={4} required />

            <Box pb={2} />
            {serverError && (
              <Typography color="error">Error: {serverError}</Typography>
            )}
            <Box pb={2} />

            <Button type="submit" disabled={submitting || pristine}>
              Submit
            </Button>
            <Button type="button" disabled={submitting || pristine} onClick={() => form.reset()}>
              Reset
            </Button>
          </form>
        )}
      />
    </Box>
  );
};
