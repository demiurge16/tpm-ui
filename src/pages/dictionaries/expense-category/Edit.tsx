import { useEffect, useState } from "react";
import { UpdateExpenseCategory } from "../../../client/types/dictionaries/ExpenseCategory";
import { useNavigate, useParams } from "react-router-dom";
import { useBreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { applicationClient } from "../../../client/ApplicationClient";
import { LoadingScreen } from "../../utils/LoadingScreen";

export const Edit = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [expenseCategory, setExpenseCategory] = useState<UpdateExpenseCategory>({
    name: '',
    description: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();

  useEffect(() => {
    if (!id) return;

    applicationClient.expenseCategories()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setExpenseCategory(response);
          setBreadcrumbs([
            { label: 'Expense category', path: '/expense-category' },
            { label: response.name, path: `/expense-category/${response.id}` },
            { label: 'Edit', path: `/expense-category/${response.id}/edit` }
          ]);
          setLoading(false);
        },
        error: (error) => {
          showError("Success", "Error loading expense category");
          setServerError(error);
        }
      });
  }, [id, setBreadcrumbs, showError, applicationClient]);

  const handleSubmit = (values: UpdateExpenseCategory) => {
    if (!id) return;

    applicationClient.expenseCategories()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => {
          showSuccess("Success", "Expense category updated");
          navigate("/expense-categories");
        },
        error: (error) => {
          showError("Error updating expense category", error.message);
          setServerError(error);
        }
      });
  }

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4">Edit {expenseCategory.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{ name: expenseCategory.name, description: expenseCategory.description }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper elevation={2} sx={{ p: 2 }}>
              <TextField name="name" label="Name" required />
              <TextField name="description" label="Description" multiline rows={4} required />
            </Paper>
            <Box pb={2} />

            {serverError && (
              <>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography color="error">Error: {serverError}</Typography>
                </Paper>
                <Box pb={2} />
              </>
            )}

            <Paper elevation={2} sx={{ p: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" disabled={submitting || pristine}>
                  Submit
                </Button>
                <Button type="button" disabled={submitting || pristine} onClick={() => form.reset()}>
                  Reset
                </Button>
              </Box>
            </Paper>
          </form>
        )}
      />
    </Box>
  );
};
