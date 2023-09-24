import { useEffect, useRef, useState } from 'react';
import { GridHandle } from '../../../components/grid/GridProps';
import { useSnackbarContext } from '../../../contexts/SnackbarContext';
import { useProjectContext } from './context/ProjectContext';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { Task } from '../../../client/types/task/Task';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Grid } from '../../../components/grid/Grid';
import EditIcon from '@mui/icons-material/Edit';
import { forkJoin } from 'rxjs';
import { formatDate } from '../../../utils/dateFormatters';
import { useTpmClient } from '../../../contexts/TpmClientContext';
import { Link } from 'react-router-dom';
import { GridConfig } from '../../../components/grid/GridConfig';
import { LoadingScreen } from '../../utils/LoadingScreen';

export const ProjectTasks = () => {
  const gridRef = useRef<GridHandle>(null);

  const [gridConfig, setGridConfig] = useState<GridConfig<Task>>({
    page: 0,
    pageSize: 25,
    columnDefs: [],
    filters: []
  });

  const { showError } = useSnackbarContext();
  const { project } = useProjectContext();
  const tpmClient = useTpmClient();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    forkJoin({
      languages: tpmClient.languages().all(),
      currencies: tpmClient.currencies().all(),
      accuracies: tpmClient.accuracies().all(),
      industries: tpmClient.industries().all(),
      units: tpmClient.units().all(),
      priorities: tpmClient.priorities().all(),
      statuses: tpmClient.tasks().refdata().statuses(),
      users: tpmClient.users().all(),
    }).subscribe({
      next: (data) => {
        const { languages, currencies, accuracies, industries, priorities, statuses, units, users } = data;

        setGridConfig(prev => {
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
                  const task = params.data as Task;
                  return (
                    <Box>
                      <Button variant="text" component={Link} to={`/tasks/${task.id}`}>
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
                  return task.status.title;
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
                        to={`/tasks/${task.id}/edit`}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </Box>
                  );
                }
              },
            ],
            filters: [
              FilterDefinition.uniqueToken('id', 'Id'),
              FilterDefinition.string('title', 'Title'),
              FilterDefinition.select('sourceLanguage', 'Source language', languages.items.map((l) => ({ value: l.code, label: l.name }))),
              FilterDefinition.select('targetLanguage', 'Target language', languages.items.map((l) => ({ value: l.code, label: l.name }))),
              FilterDefinition.select('accuracy', 'Accuracy', accuracies.items.map((a) => ({ value: a.id, label: a.name }))),
              FilterDefinition.select('industry', 'Industry', industries.items.map((i) => ({ value: i.id, label: i.name }))),
              FilterDefinition.number('amount', 'Amount'),
              FilterDefinition.select('unit', 'Unit', units.items.map((u) => ({ value: u.id, label: u.name }))),
              FilterDefinition.datetime('expectedStart', 'Expected Start'),
              FilterDefinition.datetime('deadline', 'Deadline'),
              FilterDefinition.number('budget', 'Budget'),
              FilterDefinition.select('currency', 'Currency', currencies.items.map((c) => ({ value: c.code, label: c.name }))),
              FilterDefinition.select('status', 'Status', statuses.map((s) => ({ value: s.status, label: s.title }))),
              FilterDefinition.select('priority', 'Priority', priorities.items.map((p) => ({ value: p.id, label: p.name }))),
              FilterDefinition.select('assigneeId', 'Assignee', users.items.map((u) => ({ value: u.id, label: `${u.firstName} ${u.lastName}` }))),
            ]
          };
        });
      },
      error: (error) => {
        showError("Failed to load project tasks", error.message);
      }
    });
  }, [showError, tpmClient]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Project tasks</Typography>
      <Box pb={2} />
      {
        loading ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <LoadingScreen />
          </Paper>
        ) : (
          <>
            <Grid<Task>
              innerRef={gridRef}
              startPage={gridConfig.page}
              pageSize={gridConfig.pageSize}
              fetch={tpmClient.projects().withId(project.id).tasks().all}
              exportData={tpmClient.projects().withId(project.id).tasks().export}
              filters={gridConfig.filters}
              columnDefinitions={gridConfig.columnDefs}
              elevation={2}
            />
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Button variant="contained" component={Link} to="tasks/create">Create</Button>
            </Paper>
          </>
        )
      }
    </Box>
  );
}