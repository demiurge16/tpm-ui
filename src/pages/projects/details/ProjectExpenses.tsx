import { useContext, useEffect, useRef, useState } from 'react';
import { ColumnDefinition, GridHandle } from '../../../components/grid/GridProps';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { useProjectContext } from './ProjectContext';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { Expense } from '../../../client/types/expense/Expense';
import { Box, Button, Typography } from '@mui/material';
import { Grid } from '../../../components/grid/Grid';
import TpmClient from '../../../client/TpmClient';
import { Link } from 'react-router-dom';
import { ExpenseCategory } from '../../../client/types/dictionaries/ExpenseCategory';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Currency } from '../../../client/types/dictionaries/Currency';
import { User } from '../../../client/types/user/User';
import { Project } from '../../../client/types/project/Project';
import { forkJoin } from 'rxjs';

export const ProjectExpenses = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const snackbarContext = useContext(SnackbarContext);
  const { project, setProject } = useProjectContext();

  const [filterDefs, setFilterDefs] = useState<FilterDefinition[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColumnDefinition<Expense>[]>([]);

  useEffect(() => {
    forkJoin({
      currencies: TpmClient.getInstance().currencies().all(),
      expenseCategories: TpmClient.getInstance().expenseCategories().all(),
      users: TpmClient.getInstance().users().all()
    }).subscribe({
        next: (data) => {
          setCurrencies(data.currencies.items);
          setExpenseCategories(data.expenseCategories.items);
          setUsers(data.users.items);

          setColumnDefs([
            {
              headerName: 'Id',
              field: 'id',
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
              }
            },
            { 
              headerName: 'Date',
              field: 'date',
              resizable: true,
              cellRenderer: (params: any) =>
                new Date(params.data.date).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
            },
            {
              headerName: 'Category',
              field: 'category',
              resizable: true,
              cellRenderer: (params: any) => params.data.category.name
            },
            { headerName: 'Description', field: 'description', resizable: true },
            {
              headerName: 'Amount',
              field: 'amount',
              resizable: true,
              cellRenderer: (params: any) => `${params.data.amount.toFixed(2)} ${params.data.currency.name}`
            },
            {
              headerName: 'Team member',
              resizable: true,
              cellRenderer: (params: any) => {
                const expense = params.data as Expense;
                return expense.teamMember.firstName + ' ' + expense.teamMember.lastName;
              }
            },
            {
              headerName: 'Actions',
              field: 'actions',
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
              }
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
            )
          ]);
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });
    }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Project expenses</Typography>
      <Box pb={2} />
      <Grid<Expense>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={TpmClient.getInstance().projects().withId(project.id).expenses().all}
        filters={filterDefs}
        columnDefinitions={columnDefs}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="expenses/create" >Create</Button>
    </Box>
  );
}