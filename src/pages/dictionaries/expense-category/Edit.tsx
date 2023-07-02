import { useContext, useEffect, useState } from "react";
import { UpdateExpenseCategory } from "../../../client/types/dictionaries/ExpenseCategory";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";
import TpmClient from "../../../client/TpmClient";
import { Box, Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";

export const Edit = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [expenseCategory, setExpenseCategory] = useState<UpdateExpenseCategory>({
    name: '',
    description: ''
  });
  const navigate = useNavigate();
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
            { label: 'Expense category', path: '/expense-category' },
            { label: response.name, path: `/expense-category/${response.id}` },
            { label: 'Edit', path: `/expense-category/${response.id}/edit` }
          ]);
        },
        error: (error) => setServerError(error)
      });
  }, [id]);

  const handleSubmit = (values: UpdateExpenseCategory) => {
    if (!id) return;

    TpmClient.getInstance()
      .expenseCategories()
      .withId(id)
      .update(values)
      .subscribe({
        next: () => navigate("/expense-categories"),
        error: (error) => setServerError(error)
      });
  }

  return (
    <Box>
      <Typography variant="h4">Edit {expenseCategory.name}</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={{ name: expenseCategory.name, description: expenseCategory.description }}
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
