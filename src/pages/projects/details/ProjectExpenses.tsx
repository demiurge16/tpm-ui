import { useEffect, useRef, useState } from 'react';
import { GridHandle } from '../../../components/grid/GridProps';
import { useSnackbarContext } from '../../../contexts/SnackbarContext';
import { useProjectContext } from './context/ProjectContext';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { Expense } from '../../../client/types/expense/Expense';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Grid } from '../../../components/grid/Grid';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { forkJoin } from 'rxjs';
import { GridConfig } from '../../../components/grid/GridConfig';
import { LoadingScreen } from '../../utils/LoadingScreen';
import { applicationClient } from '../../../client/ApplicationClient';

export const ProjectExpenses = () => {
  const gridRef = useRef<GridHandle>(null);

  const [gridConfig, setGridConfig] = useState<GridConfig<Expense>>({
    page: 0,
    pageSize: 25,
    columnDefs: [],
    filters: []
  });

  const { showError } = useSnackbarContext();
  const { project } = useProjectContext();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    forkJoin({
      currencies: applicationClient.currencies().all(),
      expenseCategories: applicationClient.expenseCategories().all(),
      users: applicationClient.users().all()
    }).subscribe({
        next: (data) => {
          const { currencies, expenseCategories, users } = data;
          setGridConfig(() => {
            setLoading(false);
            return {
              page: 0,
              pageSize: 25,
              columnDefs: [
                {
                  headerName: 'Id',
                  field: 'id',
                  resizable: true,
                  lockVisible: true,
                  cellRenderer: (params: any) => {
                    const expense = params.data as Expense;
                    return expense.id;
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
                          to={`/expenses/${expense.id}/edit`}
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
              ],
              filters: [
                FilterDefinition.uniqueToken("id", "Id"),
                FilterDefinition.number("amount", "Amount"),
                FilterDefinition.select(
                  "currency",
                  "Currency",
                  currencies.items.map((c) => ({ value: c.code, label: c.name }))  
                ),
                FilterDefinition.date("date", "Date"),
                FilterDefinition.select(
                  "categoryId",
                  "Category",
                  expenseCategories.items.map((c) => ({ value: c.id, label: c.name }))
                ),
                FilterDefinition.select(
                  "spenderId",
                  "Team member",
                  users.items.map((u) => ({ value: u.id, label: u.firstName + " " + u.lastName }))
                )
              ]
            };
          });
        },
        error: (error) => showError(error.message, error.response.data.message)
      });
    }, [showError, applicationClient]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Project expenses</Typography>
      <Box pb={2} />
      {
        loading ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <LoadingScreen />
          </Paper>
        ) : (
          <>
            <Grid<Expense>
              innerRef={gridRef}
              startPage={gridConfig.page}
              pageSize={gridConfig.pageSize}
              fetch={applicationClient.projects().withId(project.id).expenses().all}
              exportData={applicationClient.projects().withId(project.id).expenses().export}
              filters={gridConfig.filters}
              columnDefinitions={gridConfig.columnDefs}
              elevation={2}
            />
            <Box pb={2} />
            
            <Paper elevation={2} sx={{ p: 2 }}>
              <Button variant="contained" component={Link} to="expenses/create">Create</Button>
            </Paper>
          </>
        )
      }
    </Box>
  );
}