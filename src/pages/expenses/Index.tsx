import { useEffect, useRef, useState } from "react";
import { ColumnDefinition, GridHandle } from "../../components/grid/GridProps";
import { ExpenseCategory } from "../../client/types/dictionaries/ExpenseCategory";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { FilterDefinition } from "../../components/grid/FilterDefinition";
import { Expense } from "../../client/types/expense/Expense";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid } from "../../components/grid/Grid";
import { Expenses } from "./Expenses";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { Currency } from "../../client/types/dictionaries/Currency";
import { forkJoin } from "rxjs";
import { User } from "../../client/types/user/User";
import { Project } from "../../client/types/project/Project";
import { useTpmClient } from "../../contexts/TpmClientContext";
import { LoadingScreen } from "../utils/LoadingScreen";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const { showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();;
  const tpmClient = useTpmClient();

  const [filterDefs, setFilterDefs] = useState<FilterDefinition[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColumnDefinition<Expense>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    forkJoin({
      currencies: tpmClient.currencies().all(),
      expenseCategories: tpmClient.expenseCategories().all(),
      users: tpmClient.users().all(),
      projects: tpmClient.projects().all(),
    }).subscribe({
      next: (data) => {
        setCurrencies(data.currencies.items);
        setExpenseCategories(data.expenseCategories.items);
        setUsers(data.users.items);
        setProjects(data.projects.items);

        setColumnDefs([
          {
            headerName: "Id",
            field: "id",
            resizable: true,
            lockVisible: true
          },
          {
            headerName: "Date",
            field: "date",
            resizable: true,
            cellRenderer: (params: any) =>
              new Date(params.data.date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
          },
          {
            headerName: "Category",
            field: "category",
            resizable: true,
            cellRenderer: (params: any) => params.data.category.name,
          },
          { headerName: "Description", field: "description", resizable: true },
          {
            headerName: "Amount",
            field: "amount",
            resizable: true,
            cellRenderer: (params: any) =>
              `${params.data.amount.toFixed(2)} ${params.data.currency.name}`,
          },
          {
            headerName: "Team member",
            resizable: true,
            hide: true,
            cellRenderer: (params: any) => {
              const task = params.data as Expense;
              return task.teamMember.firstName + " " + task.teamMember.lastName;
            },
          },
          {
            headerName: "Project",
            resizable: true,
            cellRenderer: (params: any) => {
              const task = params.data as Expense;
              return (
                <Box>
                  <Button
                    variant="text"
                    component={Link}
                    to={`/projects/${task.project.id}`}
                  >
                    {task.project.title}
                  </Button>
                </Box>
              );
            },
          }
        ]);

        setFilterDefs([
          FilterDefinition.uniqueToken("id", "Id"),
          FilterDefinition.number("amount", "Amount"),
          FilterDefinition.select(
            "currency",
            "Currency",
            currencies.map((c) => ({ value: c.code, label: c.name }))  
          ),
          FilterDefinition.date("date", "Date"),
          FilterDefinition.select(
            "categoryId",
            "Category",
            expenseCategories.map((c) => ({ value: c.id, label: c.name }))
          ),
          FilterDefinition.select(
            "spenderId",
            "Team member",
            users.map((u) => ({ value: u.id, label: u.firstName + " " + u.lastName }))
          ),
          FilterDefinition.select(
            "projectId",
            "Project",
            projects.map((p) => ({ value: p.id, label: p.title }))
          ),
        ]);

        setLoading(false);
      },
      error: (error) => showError(error.message, error.response.data.message)
    });

    setBreadcrumbs([
      { label: "Expenses", path: "/expenses" },
    ]);
  }, [currencies, expenseCategories, projects, setBreadcrumbs, showError, tpmClient, users]);

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <>
      <Typography variant="h4">{Expenses.title}</Typography>
      <Typography variant="subtitle1">{Expenses.description}</Typography>
      <Box>
        <Box pb={2} />
        <Grid<Expense>
          innerRef={gridRef}
          startPage={startPage}
          pageSize={pageSize}
          fetch={tpmClient.expenses().all}
          exportData={tpmClient.expenses().export}
          filters={filterDefs}
          columnDefinitions={columnDefs}
          elevation={2}
        />
      </Box>
    </>
  );
};
