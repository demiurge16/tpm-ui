import { useContext, useEffect, useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ColumnDefinition, GridHandle } from '../../components/grid/GridProps';
import { ExpenseCategory } from '../../client/types/dictionaries/ExpenseCategory';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { FilterDefinition } from '../../components/grid/FilterDefinition';
import { Expense } from '../../client/types/expense/Expense';
import TpmClient from '../../client/TpmClient';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Grid } from '../../components/grid/Grid';
import { Expenses } from './Expenses';
import { BreadcrumbsContext } from '../../contexts/BreadcrumbsContext';

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const [filterDefs, setFilterDefs] = useState<FilterDefinition[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColumnDefinition<Expense>[]>([]);

  useEffect(() => {
    TpmClient.getInstance()
      .expenseCategories()
      .all()
      .subscribe({
        next: (categories) => {
          setExpenseCategories(categories.items);

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
              hide: true,
              cellRenderer: (params: any) => {
                const task = params.data as Expense;
                return task.teamMember.firstName + ' ' + task.teamMember.lastName;
              }
            },
            {
              headerName: 'Project',
              resizable: true,
              cellRenderer: (params: any) => {
                const task = params.data as Expense;
                return (
                  <Box>
                    <Button variant="text" component={Link} to={`/projects/${task.project.id}`}>
                      {task.project.title}
                    </Button>
                  </Box>
                );
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
            FilterDefinition.date('date', 'Date'),
            FilterDefinition.select('category', 'Category', expenseCategories.map((c) => ({ value: c.id, label: c.name }))),
            FilterDefinition.number('amount', 'Amount'),
          ]);
        }
      });

      breadcrumbsContext.setBreadcrumbs([
        { label: 'Expenses', path: '/expenses' }
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
        filters={filterDefs}
        columnDefinitions={columnDefs}
      />
    </Box>
  );
};
