import { useState } from "react";
import { useTpmClient } from "../../../contexts/TpmClientContext";
import { useTaskContext } from "./TaskContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { TaskMoveStart } from "../../../client/types/task/Task";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { DateTimeField } from "../../../components/form-controls/DateTimeField";

export interface MoveStartDialogProps {
  open: boolean;
  onClose: () => void;
}

export const MoveStartDialog = ({ open, onClose }: MoveStartDialogProps) => {
  const { task, setTask } = useTaskContext();
  const tpmClient = useTpmClient();
  const { showSuccess, showError } = useSnackbarContext();

  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = (data: TaskMoveStart) =>
    tpmClient.tasks()
      .withId(task.id)
      .moveStart(data)
      .subscribe({
        next: (response) => {
          showSuccess("Success", "Start date moved");
          setTask({
            ...task,
            expectedStart: response.start
          });
          onClose();
        },
        error: (error) => {
          showError(error.message, error.response.data.message);
          setServerError(error.response.data.message || error.message);
        }
      });

  return task.expectedStart && (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="move-start-dialog-title"
      aria-describedby="move-start-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{
          expectedStart: task.expectedStart
        }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <DialogTitle id="move-start-dialog-title">Move start date</DialogTitle>
            <DialogContent>
              <DateTimeField name="expectedStart" label="Expected start" required />

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