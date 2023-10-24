import { useEffect, useRef, useState } from "react";
import { ColumnDefinition, GridHandle } from "../../components/grid/GridProps";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { FilterDefinition } from "../../components/grid/FilterDefinition";
import { Task } from "../../client/types/task/Task";
import { forkJoin } from "rxjs";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid } from "../../components/grid/Grid";
import { Tasks } from "./Tasks";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { formatDate } from "../../utils/dateFormatters";
import { applicationClient } from "../../client/ApplicationClient";
import { LoadingScreen } from "../utils/LoadingScreen";

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<GridHandle>(null);

  const { showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();

  const [filterDefs, setFilterDefs] = useState<FilterDefinition[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColumnDefinition<Task>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    forkJoin({
      languages: applicationClient.languages().all(),
      currencies: applicationClient.currencies().all(),
      accuracies: applicationClient.accuracies().all(),
      industries: applicationClient.industries().all(),
      units: applicationClient.units().all(),
      priorities: applicationClient.priorities().all(),
      statuses: applicationClient.tasks().refdata().statuses(),
      users: applicationClient.users().all(),
      projects: applicationClient.projects().all(),
    }).subscribe({
      next: (data) => {
        const { languages, currencies, accuracies, industries, priorities, statuses, units, users, projects } = data;

        setFilterDefs([
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
          FilterDefinition.select('projectId', 'Project', projects.items.map((p) => ({ value: p.id, label: p.title }))),
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
            headerName: 'Project',
            resizable: true,
            cellRenderer: (params: any) => {
              const task = params.data as Task;
              return (
                <Box>
                  <Button variant="text" component={Link} to={`/projects/${task.project.id}`}>
                    {task.project.title}
                  </Button>
                </Box>
              );
            }
          }
        ]);
        setLoading(false);
      },
      error: (error) => {
        showError("Failed to load project tasks", error.message);
      }
    });

    setBreadcrumbs([
      { label: 'Tasks', path: '/tasks' }
    ]);
  }, [setBreadcrumbs, showError, applicationClient]);

  return (
    <Box>
      <Typography variant="h4">{Tasks.title}</Typography>
      <Typography variant="subtitle1">{Tasks.description}</Typography>
      <Box pb={2} />
      {
        loading ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <LoadingScreen />
          </Paper>
        ) : (
          <Grid<Task>
            innerRef={gridRef}
            startPage={startPage}
            pageSize={pageSize}
            fetch={applicationClient.tasks().all}
            exportData={applicationClient.tasks().export}
            filters={filterDefs}
            columnDefinitions={columnDefs}
            elevation={2}
          />
        )
      }
    </Box>
  );
};
