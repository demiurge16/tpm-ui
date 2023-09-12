import { useContext, useState } from "react";
import { useTpmClient } from "../../../contexts/TpmClientContext";
import { useTaskContext } from "./TaskContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { TaskMoveDeadline } from "../../../client/types/task/Task";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { DateTimeField } from "../../../components/form-controls/DateTimeField";

export interface MoveDeadlineDialogProps {
  open: boolean;
  onClose: () => void;
}

export const MoveDeadlineDialog = ({ open, onClose }: MoveDeadlineDialogProps) => {
  const { task, setTask } = useTaskContext();
  const tpmClient = useTpmClient();
  const snackbarContext = useContext(SnackbarContext);

  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = (data: TaskMoveDeadline) =>
    tpmClient.tasks()
      .withId(task.id)
      .moveDeadline(data)
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess("Success", "Deadline moved");
          setTask({
            ...task,
            deadline: response.deadline
          });
          onClose();
        },
        error: (error) => {
          snackbarContext.showError(error.message, error.response.data.message);
          setServerError(error.response.data.message || error.message);
        }
      });

  return task.expectedStart && (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="move-deadline-dialog-title"
      aria-describedby="move-deadline-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{
          deadline: task.deadline
        }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <DialogTitle id="move-deadline-dialog-title">Move deadline</DialogTitle>
            <DialogContent>
              <DateTimeField name="deadline" label="Deadline" required />

              <Box pb={2} />
              {serverError && (
                <Typography color="error">Error: {serverError}</Typography>
              )}
              <Box pb={2} />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button variant="contained" color="primary" type="submit" disabled={submitting || pristine}>Move</Button>
            </DialogActions>
          </form>
        )}
      />
    </Dialog>
  );
}
