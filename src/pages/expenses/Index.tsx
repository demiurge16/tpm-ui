import { useContext, useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ColumnDefinition, GridHandle } from "../../components/grid/GridProps";
import { ExpenseCategory } from "../../client/types/dictionaries/ExpenseCategory";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { FilterDefinition } from "../../components/grid/FilterDefinition";
import { Expense } from "../../client/types/expense/Expense";
import TpmClient from "../../client/TpmClient";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid } from "../../components/grid/Grid";
import { Expenses } from "./Expenses";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { Currency } from "../../client/types/dictionaries/Currency";
import { forkJoin } from "rxjs";
import { User } from "../../client/types/user/User";
import { Project } from "../../client/types/project/Project";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const [filterDefs, setFilterDefs] = useState<FilterDefinition[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColumnDefinition<Expense>[]>([]);

  useEffect(() => {
    forkJoin({
      currencies: TpmClient.getInstance().currencies().all(),
      expenseCategories: TpmClient.getInstance().expenseCategories().all(),
      users: TpmClient.getInstance().users().all(),
      projects: TpmClient.getInstance().projects().all(),
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
            lockVisible: true,
            cellRenderer: (params: any) => {
              const expense = params.data as Expense;
              return (
                <Box>
                  <Button variant="text" component={Link} to={`${expense.id}`}>
                    {expense.id}
                  </Button>
                </Box>
              );
            },
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
          },
          {
            headerName: "Actions",
            field: "actions",
            resizable: true,
            cellRenderer: (params: any) => {
              const expense = params.data as Expense;
              return (
                <Box>
                  <Button
                    variant="text"
                    component={Link}
                    to={`${expense.id}/edit`}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    component={Link}
                    to={`${expense.id}/delete`}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Box>
              );
            },
          },
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
      },
      error: (error) => snackbarContext.showError(error.message, error.response.data.message)
    });

    breadcrumbsContext.setBreadcrumbs([
      { label: "Expenses", path: "/expenses" },
    ]);
  }, []);

  return (
    <Box>
      <Typography variant="h4">{Expenses.title}</Typography>
      <Typography variant="subtitle1">{Expenses.description}</Typography>
      <Grid<Expense>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={TpmClient.getInstance().expenses().all}
        export={TpmClient.getInstance().expenses().export}
        filters={filterDefs}
        columnDefinitions={columnDefs}
      />
    </Box>
  );
};
