import { Box, Button, Paper, Typography } from "@mui/material";
import { useTaskContext } from "./TaskContext";
import { GridHandle } from "../../../components/grid/GridProps";
import { GridConfig } from "../../../components/grid/GridConfig";
import { TimeEntry, TimeUnit } from "../../../client/types/task/TimeEntry";
import { useEffect, useRef, useState } from "react";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { LoadingScreen } from "../../utils/LoadingScreen";
import { Grid } from "../../../components/grid/Grid";
import { applicationClient } from "../../../client/ApplicationClient";
import { forkJoin } from "rxjs";
import { FilterDefinition } from "../../../components/grid/FilterDefinition";
import { TaskCreateTimeEntryDialog } from "./TaskCreateTimeEntryDialog";
import { formatDate } from "../../../utils/dateFormatters";
import { DeleteForever, Done, Edit, ThumbDown, ThumbUp } from "@mui/icons-material";
import { ICellRendererParams } from "ag-grid-community";
import { TeamMember } from "../../../client/types/project/TeamMember";
import { TaskEditTimeEntryDialog } from "./TaskEditTimeEntryDialog";
import { DeleteTimeEntryDialog } from "./TaskDeleteTimeEntryDialog";

export const TaskTimeEntries = () => {
  const gridRef = useRef<GridHandle>(null);

  const [gridConfig, setGridConfig] = useState<GridConfig<TimeEntry>>({
    page: 0,
    pageSize: 25,
    columnDefs: [],
    filters: []
  });

  const { showError } = useSnackbarContext();
  const { task } = useTaskContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([]);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const openCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const closeCreateDialog = () => {
    setCreateDialogOpen(false);
    gridRef.current?.refresh();
  };

  useEffect(() => {
    forkJoin({
      teamMembers: applicationClient.projects().withId(task.project.id).teamMembers().all(),
      statuses: applicationClient.timeEntries().refdata().statuses(),
      timeUnits: applicationClient.timeEntries().refdata().timeUnits()
    }).subscribe({
      next: ({ teamMembers, statuses, timeUnits }) => {
        setTeamMembers(teamMembers.items);
        setTimeUnits(timeUnits);
        setGridConfig({
          ...gridConfig,
          columnDefs: [
            {
              headerName: 'Id',
              field: 'id',
              resizable: true,
              lockVisible: true 
            },
            {
              headerName: 'Description',
              field: 'description',
              resizable: true 
            },
            {
              headerName: 'Date',
              field: 'date',
              resizable: true,
              valueFormatter: (params) => formatDate(params.value)
            },
            {
              headerName: 'Time',
              resizable: true,
              valueFormatter: (params) => {
                const timeEntry = params.data as TimeEntry;
                return `${timeEntry.timeSpent} ${timeEntry.timeUnit.title}`;
              }
            },
            {
              headerName: 'Status',
              field: 'status',
              resizable: true,
              valueFormatter: (params) => {
                const timeEntry = params.data as TimeEntry;
                return timeEntry.status.title;
              }
            },
            {
              headerName: 'User',
              field: 'user',
              resizable: true,
              valueFormatter: (params) => {
                const timeEntry = params.data as TimeEntry;
                return `${timeEntry.user.firstName} ${timeEntry.user.lastName}`;
              }
            },
            {
              headerName: 'Actions',
              resizable: true,
              cellRenderer: (params: ICellRendererParams<TimeEntry>) => ActionsCellRenderer(gridRef, teamMembers.items, timeUnits, params)
            }
          ],
          filters: [
            FilterDefinition.uniqueToken('id', 'Id'),
            FilterDefinition.string('description', 'Description'),
            FilterDefinition.date('date', 'Date'),
            FilterDefinition.number('timeSpent', 'Time'),
            FilterDefinition.select(
              'timeUnit',
              'Time unit',
              timeUnits.map((unit) => ({ value: unit.unit, label: unit.title }))
            ),
            FilterDefinition.select(
              'status',
              'Status',
              statuses.map((status) => ({ value: status.status, label: status.title }))
            ),
            FilterDefinition.select(
              'user',
              'User',
              teamMembers.items.map((tm) => ({ value: tm.userId, label: tm.firstName + ' ' + tm.lastName }))
            )
          ]
        });
        setLoading(false);
      },
      error: (error) => {
        showError(error.message, error.response.data.message);
        setLoadingError(error.response.data.message || error.message);
        setLoading(false);
      }
    });

  }, []);

  if (loading) {
    return (
      <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
        <LoadingScreen />
      </Paper>
    );
  }

  if (loadingError) {
    return (
      <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h4" gutterBottom>Error loading time entries for task {task.id}</Typography>
        <Typography variant="body1" gutterBottom>{loadingError}</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h5" gutterBottom>Time entries</Typography>
      <Box pb={2} />

      {
        loading ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <LoadingScreen />
          </Paper>
        ) : (
          <>
            <Grid<TimeEntry>
              innerRef={gridRef}
              startPage={gridConfig.page}
              pageSize={gridConfig.pageSize}
              fetch={applicationClient.tasks().withId(task.id).timeEntries().all}
              exportData={applicationClient.tasks().withId(task.id).timeEntries().export}
              filters={gridConfig.filters}
              columnDefinitions={gridConfig.columnDefs}
              elevation={2}
            />
            <Box pb={2} />
            
            <Paper elevation={2} sx={{ p: 2 }}>
              <Button variant="contained" onClick={openCreateDialog}>Create time entry</Button>
              <TaskCreateTimeEntryDialog open={createDialogOpen}
                onClose={closeCreateDialog}
                teamMembers={teamMembers}
                timeUnits={timeUnits}
              />
            </Paper>
          </>
        )
      }
    </Paper>
  );
}

const ActionsCellRenderer = (
  gridRef: React.RefObject<GridHandle>,
  teamMembers: TeamMember[],
  timeUnits: TimeUnit[],
  params: ICellRendererParams<TimeEntry>
) => {
  const timeEntry = params.data as TimeEntry;
  const { showSuccess, showError } = useSnackbarContext();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openEditDialog = () => {
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    gridRef.current?.refresh();
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    gridRef.current?.refresh();
  };

  const submitTimeEntry = () => {
    applicationClient.timeEntries()
      .withId(timeEntry.id)
      .submit()
      .subscribe({
        next: () => {
          showSuccess("Success", "Time entry submitted");
          gridRef.current?.refresh();
        },
        error: (error) => {
          showError(error.message, error.response.data.message);
        }
      });
  };

  const approveTimeEntry = () => {
    applicationClient.timeEntries()
      .withId(timeEntry.id)
      .approve()
      .subscribe({
        next: () => {
          showSuccess("Success", "Time entry approved");
          gridRef.current?.refresh();
        },
        error: (error) => {
          showError(error.message, error.response.data.message);
        }
      });
  };

  const rejectTimeEntry = () => {
    applicationClient.timeEntries()
      .withId(timeEntry.id)
      .reject()
      .subscribe({
        next: () => {
          showSuccess("Success", "Time entry rejected");
          gridRef.current?.refresh();
        },
        error: (error) => {
          showError(error.message, error.response.data.message);
        }
      });
  };

  return (
    <Box>
      {
        timeEntry.status.status === 'DRAFT' && (
          <Button variant="text" startIcon={<Done />} onClick={submitTimeEntry}>Submit</Button>
        )
      }
      {
        timeEntry.status.status === 'SUBMITTED' && (
          <>
            <Button variant="text" startIcon={<ThumbUp />} onClick={approveTimeEntry}>
              Approve
            </Button>
            <Button variant="text" color="secondary" startIcon={<ThumbDown />} onClick={rejectTimeEntry}>
              Reject
            </Button>
          </>
        )
      }
      {
        timeEntry.status.status !== 'APPROVED' && (
          <>
            <Button variant="text" startIcon={<Edit />} onClick={openEditDialog}>Edit</Button>
            <TaskEditTimeEntryDialog open={editDialogOpen}
              onClose={closeEditDialog}
              timeEntry={timeEntry}
              teamMembers={teamMembers}
              timeUnits={timeUnits}
            />

            <Button variant="text" color="secondary" startIcon={<DeleteForever />} onClick={openDeleteDialog}>Delete</Button>
            <DeleteTimeEntryDialog open={deleteDialogOpen}
              onClose={closeDeleteDialog}
              timeEntry={timeEntry}
            />
          </>
        )
      }

    </Box>
  );
};
