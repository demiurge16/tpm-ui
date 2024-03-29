import { useState } from "react";
import { applicationClient } from "../../../client/ApplicationClient";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { useTaskContext } from "./TaskContext";
import { Box, Button, Link, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { formatDateTime } from "../../../utils/dateFormatters";
import { MoveStartDialog } from "./TaskMoveStartDialog";
import { MoveDeadlineDialog } from "./TaskMoveDeadlineDialog";
import { ChangeAssigneeDialog } from "./TaskChangeAssigneeDialog";
import { createStatusTransitionHandler } from "./TaskStatusTransitionHandlers";
import { ChangePriorityDialog } from "./TaskChangePriorityDialog";

export const TaskDetails = () => {
  const { task, setTask } = useTaskContext();
  const { showSuccess, showError } = useSnackbarContext();
  const statusTransitionHandlers = createStatusTransitionHandler(applicationClient, task.id);

  const [moveStartDialogOpen, setMoveStartDialogOpen] = useState(false);
  const [moveDeadlinesDialogOpen, setMoveDeadlinesDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [changePriorityDialogOpen, setChangePriorityDialogOpen] = useState(false);

  const openMoveStartDialog = () => {
    setMoveStartDialogOpen(true);
  };

  const closeMoveStartDialog = () => {
    setMoveStartDialogOpen(false);
  };

  const openMoveDeadlinesDialod = () => {
    setMoveDeadlinesDialogOpen(true);
  };

  const closeMoveDeadlinesDialog = () => {
    setMoveDeadlinesDialogOpen(false);
  };

  const openAssignDialog = () => {
    setAssignDialogOpen(true);
  };

  const closeAssignDialog = () => {
    setAssignDialogOpen(false);
  };

  const openChangePriorityDialog = () => {
    setChangePriorityDialogOpen(true);
  };

  const closeChangePriorityDialog = () => {
    setChangePriorityDialogOpen(false);
  };

  return (
    <>
      <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h5" gutterBottom>Description</Typography>
        <Typography variant="body1">
          Project: <Link component={RouterLink} color="inherit" to={`/projects/${task.project.id}`}>{task.project.title}</Link>
        </Typography>
        <Typography variant="body1">
          Languages (from -&gt; to): {`${task.sourceLanguage.name} -> ${task.targetLanguage.name}`}
        </Typography>
        <Typography variant="body1">
          Accuracy: {`${task.accuracy.name} (${task.accuracy.description})`}
        </Typography>
        <Typography variant="body1">
          Industry: {`${task.industry.name} (${task.industry.description})`}
        </Typography>
        <Typography variant="body1">
          Service type: {`${task.serviceType.name} (${task.serviceType.description})`}
        </Typography>
        <Typography variant="body1">
          Task size: {`${task.amount} ${task.unit.name}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Budget: {`${task.budget} ${task.currency.name}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Priority: {`${task.priority.name} ${task.priority.emoji} (${task.priority.description})`}
        </Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Time frame
        </Typography>
        <Typography variant="body1">
          Expected start: {formatDateTime(task.expectedStart)}
        </Typography>
        <Typography variant="body1">
          Deadline: {formatDateTime(task.deadline)}
        </Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Task status
        </Typography>
        <Typography variant="body1" gutterBottom>
          {task.status.title}: {task.status.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Assignee: {task.assignee ? `${task.assignee.firstName} ${task.assignee.lastName}` : "Not assigned"}
        </Typography>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h5" gutterBottom>
          Actions
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="edit"
          sx={{
            marginRight: 1,
          }}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={openMoveStartDialog}
          sx={{
            marginRight: 1,
          }}
        >
          Move start
        </Button>
        <MoveStartDialog
          open={moveStartDialogOpen}
          onClose={closeMoveStartDialog}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={openMoveDeadlinesDialod}
          sx={{
            marginRight: 1,
          }}
        >
          Move deadline
        </Button>
        <MoveDeadlineDialog
          open={moveDeadlinesDialogOpen}
          onClose={closeMoveDeadlinesDialog}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={openAssignDialog}
          sx={{
            marginRight: 1,
          }}
        >
          Assign to user
        </Button>
        <ChangeAssigneeDialog
          open={assignDialogOpen}
          onClose={closeAssignDialog}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={openChangePriorityDialog}
          sx={{
            marginRight: 1,
          }}
        >
          Change priority
        </Button>
        <ChangePriorityDialog
          open={changePriorityDialogOpen}
          onClose={closeChangePriorityDialog}
        />

        {
            Object.entries(statusTransitionHandlers[task.status.status])
              .map((key) => {
                const [statusCode, targetAction] = key;

                return (
                  <Button
                    sx={{
                      marginRight: 1
                    }}
                    key={statusCode}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      targetAction.action()
                        .subscribe({
                          next: (status) => {
                            setTask({
                              ...task,
                              status: status.status
                            });
                            
                            showSuccess('Success', 'Task status changed');
                          },
                          error: (error) => {
                            showError('Failed to change task status', error.message);
                          }
                        });
                    }}
                  >
                    {targetAction.name}
                  </Button>
                );
              })
          }
      </Paper>
    </>
  );
};
