import { useContext, useEffect, useState } from "react";
import { UpdateExpenseCategory } from "../../../client/types/dictionaries/ExpenseCategory";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { useTpmClient } from "../../../contexts/TpmClientContext";
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
  const tpmClient = useTpmClient();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    if (!id) return;

    tpmClient.expenseCategories()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setExpenseCategory(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Expense category', path: '/expense-category' },
            { label: response.name, path: `/expense-category/${response.id}` },
            { label: 'Edit', path: `/expense-category/${response.id}/edit` }
          ]);
          setLoading(false);
        },
        error: (error) => {
          snackbarContext.showError("Success", "Error loading expense category");
          setServerError(error);
        }
      });
  }, [id]);

  const handleSubmit = (values: UpdateExpenseCategory) => {
    if (!id) return;

    tpmClient.expenseCategories()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess("Success", "Expense category updated");
          navigate("/expense-categories");
        },
        error: (error) => {
          snackbarContext.showError("Error updating expense category", error.message);
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
