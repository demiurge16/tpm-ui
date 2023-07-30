import { useContext, useEffect, useRef, useState } from 'react';
import { ColumnDefinition, GridHandle } from '../../../components/grid/GridProps';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { useProjectContext } from './ProjectContext';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { Task } from '../../../client/types/task/Task';
import { Box, Button, Typography } from '@mui/material';
import { Grid } from '../../../components/grid/Grid';
import TpmClient from '../../../client/TpmClient';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { forkJoin } from 'rxjs';

export const ProjectTasks = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const snackbarContext = useContext(SnackbarContext);
  const { project, setProject } = useProjectContext();

  const [filterDefs, setFilterDefs] = useState<FilterDefinition[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColumnDefinition<Task>[]>([]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });
  }

  useEffect(() => {
    forkJoin({
      accuracies: TpmClient.getInstance().accuracies().all(),
      priorities: TpmClient.getInstance().priorities().all(),
      statuses: TpmClient.getInstance().tasks().refdata().statuses(),
      units: TpmClient.getInstance().units().all(),
    }).subscribe({
      next: (data) => {
        const accuracies = data.accuracies.items;
        const priorities = data.priorities.items;
        const statuses = data.statuses;
        const units = data.units.items;

        setFilterDefs([
          FilterDefinition.string('title', 'Title'),
          FilterDefinition.string('description', 'Description'),
          FilterDefinition.select('status', 'Status', statuses.map((s) => ({ value: s.status, label: s.name }))),
          FilterDefinition.select('priority', 'Priority', priorities.map((p) => ({ value: p.id, label: p.name }))),
          FilterDefinition.select('accuracy', 'Accuracy', accuracies.map((a) => ({ value: a.id, label: a.name }))),
          FilterDefinition.datetime('expectedStart', 'Expected Start'),
          FilterDefinition.datetime('deadline', 'Deadline'),
          FilterDefinition.select('unit', 'Unit', units.map((u) => ({ value: u.id, label: u.name }))),
          FilterDefinition.number('amount', 'Amount'),
          FilterDefinition.number('budget', 'Budget'),
        ]);
        
        setColumnDefs([
          {
            headerName: 'Id',
            field: 'id',
            resizable: true,
            lockVisible: true,
            cellRenderer: (params: any) => {
              const task = params.data as Task;
              return (
                <Box>
                  <Button variant="text" component={Link} to={`${task.id}`}>
                    {task.id}
                  </Button>
                </Box>
              );
            }
          },
          { 
            headerName: 'Title',
            field: 'title',
            resizable: true,
          },
          { 
            headerName: 'Description',
            field: 'description',
            resizable: true,
            hide: true
          },
          { 
            headerName: 'Status',
            field: 'status',
            resizable: true,
            cellRenderer: (params: any) => {
              const task = params.data as Task;
              return task.status.name;
            }
          },
          {
            headerName: 'Timeframe',
            resizable: true,
            cellRenderer: (params: any) => {
              const task = params.data as Task;
              return `${formatDate(task.expectedStart)} - ${formatDate(task.deadline)}`;
            }
          },
          {
            headerName: 'Priority',
            field: 'priority',
            resizable: true,
            cellRenderer: (params: any) => {
              const task = params.data as Task;
              return `${task.priority.emoji} ${task.priority.name}`;
            }
          },
          {
            headerName: 'Assigned to',
            resizable: true,
            cellRenderer: (params: any) => {
              const task = params.data as Task;
              return task.assignee ? `${task.assignee.firstName} ${task.assignee.lastName}` : '--';
            }
          },
          {
            headerName: 'Language pair',
            resizable: true,
            cellRenderer: (params: any) => {
              const task = params.data as Task;
              return `${task.sourceLanguage.name} -> ${task.targetLanguage.name}`;
            }
          },
          {
            headerName: 'Volume',
            resizable: true,
            cellRenderer: (params: any) => {
              const task = params.data as Task;
              return `${task.amount} ${task.unit.name}`;
            }
          },
          {
            headerName: 'Budget',
            resizable: true,
            cellRenderer: (params: any) => {
              const task = params.data as Task;
              return `${task.budget} ${task.currency.name}`;
            }
          },
          {
            headerName: 'Accuracy',
            field: 'accuracy',
            resizable: true,
            hide: true,
            cellRenderer: (params: any) => {
              const task = params.data as Task;
              return task.accuracy.name;
            }
          },
          {
            headerName: 'Industry',
            field: 'industry',
            resizable: true,
            hide: true,
            cellRenderer: (params: any) => {
              const task = params.data as Task;
              return task.industry.name;
            }
          },
          { 
            headerName: 'Actions',
            field: 'actions',
            resizable: true,
            cellRenderer: (params: any) => {
              const task = params.data as Task;
              return (
                <Box>
                  <Button variant="text"
                    component={Link}
                    to={`${task.id}/edit`}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button variant="text"
                    component={Link}
                    to={`${task.id}/delete`}
                    startIcon={<DeleteIcon />}  
                  >
                    Delete
                  </Button>
                </Box>
              );
            }
          },
        ]);
      },
      error: (error) => {
        snackbarContext.showError("Failed to load project tasks", error.message);
      }
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Project tasks</Typography>
      <Box pb={2} />
      <Grid<Task>
        innerRef={gridRef}
        startPage={startPage}
        pageSize={pageSize}
        fetch={TpmClient.getInstance().projects().withId(project.id).tasks().all}
        filters={filterDefs}
        columnDefinitions={columnDefs}
      />
      <Box pb={2} />
      <Button variant="contained" component={Link} to="tasks/create">Create</Button>
    </Box>
  );
}