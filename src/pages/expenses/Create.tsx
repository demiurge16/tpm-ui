import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExpenseCategory } from "../../client/types/expense/Expense";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { CreateExpense } from "../../client/types/project/Expense";
import { TeamMember } from "../../client/types/project/TeamMember";
import { forkJoin } from "rxjs";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../components/form-controls/TextField";
import { SelectField } from "../../components/form-controls/SelectField";
import { NumberField } from "../../components/form-controls/NumberField";
import { AsyncSelectField } from "../../components/form-controls/AsyncSelectField";
import { DateField } from "../../components/form-controls/DateField";
import { useTpmClient } from "../../contexts/TpmClientContext";
import { LoadingScreen } from "../utils/LoadingScreen";
import { Currency } from "../../client/types/dictionaries/Currency";

export const Create = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const [expenseCategories, setExpenseCategories] = useState<Array<ExpenseCategory>>([]);
  const [teamMembers, setTeamMembers] = useState<Array<TeamMember>>([]);
  const [currencies, setCurrencies] = useState<Array<Currency>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { projectId } = useParams();

  const navigate = useNavigate();

  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();;
  const tpmClient = useTpmClient();

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
      expenseCategories: tpmClient.expenseCategories().all(),
      teamMembers: tpmClient.projects()
        .withId(projectId)
        .teamMembers()
        .all(),
      currencies: tpmClient.currencies().all()
    }).subscribe({
      next: (response) => {
        setExpenseCategories(response.expenseCategories.items);
        setTeamMembers(response.teamMembers.items);
        setCurrencies(response.currencies.items);
        setLoading(false);
      },
      error: (error) => {
        showError("Error loading reference data", error.message);
        setServerError(error.message);
      }
    });

    setBreadcrumbs([
      { label: "Expenses", path: "/expenses" },
      { label: "Create", path: "/expenses/create" },
    ]);
  }, [projectId, setBreadcrumbs, showError, tpmClient]);

  const handleSubmit = (values: CreateExpense) => {
    if (!projectId) {
      return;
    }

    tpmClient
      .projects()
      .withId(projectId)
      .expenses()
      .create(values)
      .subscribe({
        next: () => {
          showSuccess("Success", "Expense created");
          navigate(`/projects/${projectId}`);
        },
        error: (error) => {
          showError("Error creating expense", error.message);
          setServerError(error.message);
        }
      });
  };

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4">Add new expense</Typography>
      <Box pb={2} />
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={initialValues}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">Expense details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DateField name="date" label="Date" required />
                </Grid>
                <Grid item xs={6}>
                  <SelectField name="spenderId" label="Team Member" required
                    options={teamMembers.map((e) => ({ key: e.userId, value: e.firstName + ' ' + e.lastName }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="description" label="Description" required multiline rows={2} />
                </Grid>
                <Grid item xs={12}>
                  <SelectField name="category" label="Category" required
                    options={expenseCategories.map((e) => ({ key: e.id, value: e.name}))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumberField name="amount" label="Amount" required />
                </Grid>
                <Grid item xs={6}>
                  <AsyncSelectField name="currency" label="Currency" required
                    options={currencies.map((e) => ({ key: e.code, value: e.name}))}
                  />
                </Grid>
              </Grid>
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
        )} />
    </Box>
  );
};
