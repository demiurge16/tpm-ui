import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExpenseCategory } from "../../client/types/expense/Expense";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { CreateExpense } from "../../client/types/project/Expense";
import { TeamMember } from "../../client/types/project/TeamMember";
import { forkJoin, map } from "rxjs";
import TpmClient from "../../client/TpmClient";
import { Box, Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../components/form-controls/TextField";
import { SelectField } from "../../components/form-controls/SelectField";
import { NumberField } from "../../components/form-controls/NumberField";
import { AsyncSelectField } from "../../components/form-controls/AsyncSelectField";
import { DateField } from "../../components/form-controls/DateField";

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const [expenseCategories, setExpenseCategories] = useState<Array<ExpenseCategory>>([]);
  const [teamMembers, setTeamMembers] = useState<Array<TeamMember>>([]);

  const { projectId } = useParams();

  const navigate = useNavigate();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const initialValues: CreateExpense = {
    description: '',
    category: '',
    amount: 0,
    currency: '',
    date: new Date(),
    teamMemberId: ''
  };

  useEffect(() => {
    if (!projectId) {
      return;
    }

    forkJoin({
      expenseCategories: TpmClient.getInstance()
        .expenseCategories()
        .all(),
      teamMembers: TpmClient.getInstance()
        .projects()
        .withId(projectId)
        .teamMembers()
        .all()
    }).subscribe({
      next: (response) => {
        setExpenseCategories(response.expenseCategories.items);
        setTeamMembers(response.teamMembers.items);
      },
      error: (error) => {
        snackbarContext.showError("Error loading reference data", error.message);
        setServerError(error.message);
      }
    });

    breadcrumbsContext.setBreadcrumbs([
      { label: "Expenses", path: "/expenses" },
      { label: "Create", path: "/expenses/create" },
    ]);
  }, [projectId]);

  const handleSubmit = (values: CreateExpense) => {
    if (!projectId) {
      return;
    }

    TpmClient.getInstance()
      .projects()
      .withId(projectId)
      .expenses()
      .create(values)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess("Success", "Expense created");
          navigate(`/projects/${projectId}`);
        },
        error: (error) => {
          snackbarContext.showError("Error creating expense", error.message);
          setServerError(error.message);
        }
      });
  };

  return (
    <Box>
      <Typography variant="h4">Add new expense</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField name="description" label="Description" required />
            <SelectField name="category" label="Category" required
              options={expenseCategories.map((e) => ({ key: e.id, value: e.name}))}
            />
            <NumberField name="amount" label="Amount" required />
            <AsyncSelectField name="currency" label="Currency" required
              optionsLoader={() =>
                TpmClient.getInstance()
                  .currencies()
                  .all({
                    page: 0,
                    pageSize: 25,
                    sort: [],
                    filters: []
                  })
                  .pipe(
                    map((response) => {
                      return {
                        totalPages: response.totalPages,
                        totalElements: response.totalElements,
                        items: response.items.map((currency) => ({ key: currency.code, value: currency.name }))
                      }
                    }
                  ))
              }
            />
            <DateField name="date" label="Date" required />
            <SelectField name="teamMemberId" label="Team Member" required
              options={teamMembers.map((e) => ({ key: e.id, value: e.firstName + ' ' + e.lastName }))}
            />
            
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
        )} />
    </Box>
  );
};
