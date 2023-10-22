import { useEffect, useState } from "react";
import { useTpmClient } from "../../../contexts/TpmClientContext";
import { useTaskContext } from "./TaskContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { SelectField } from "../../../components/form-controls/SelectField";
import { Priority } from "../../../client/types/dictionaries/Priority";
import { ChangePriority } from "../../../client/types/task/Task";

export interface ChangePriorityDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ChangePriorityDialog = (
  { open, onClose }: ChangePriorityDialogProps
) => {
  const { task, setTask } = useTaskContext();
  const tpmClient = useTpmClient();
  const { showSuccess, showError } = useSnackbarContext();

  const [serverError, setServerError] = useState<string | null>(null);

  const [priorities, setPriorities] = useState<Priority[]>([]);

  useEffect(() => {
    tpmClient.priorities()
      .all()
      .subscribe({
        next: (response) => setPriorities(response.items),
        error: (error) => {
          showError(error.message, error.response.data.message);
          setServerError(error.response.data.message || error.message);
        }
      });
  }, [showError, task.id, tpmClient]);

  const handleSubmit = (data: ChangePriority) =>
    tpmClient.tasks()
      .withId(task.id)
      .changePriority(data)
      .subscribe({
        next: (response) => {
          showSuccess("Success", "Priority changed");
          setTask({
            ...task,
            priority: response.priority
          });
          onClose();
        },
        error: (error) => {
          showError(error.message, error.response.data.message);
          setServerError(error.response.data.message || error.message);
        }
      });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="change-priority-dialog-title"
      aria-describedby="change-priority-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{
          priority: task.priority
        }}
        render={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <DialogTitle id="change-priority-dialog-title">Change priority</DialogTitle>
            <DialogContent>
              <SelectField name="priority" label="Priority" required
                options={priorities.map((priority) => ({
                  key: priority.id,
                  value: priority.name
                }))}
              />

              <Box pb={2} />
              {serverError && (
                <Typography color="error">Error: {serverError}</Typography>
              )}
              <Box pb={2} />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button variant="contained" color="primary" type="submit" disabled={submitting || pristine}>Change priority</Button>
            </DialogActions>
          </form>
        )}
      />
    </Dialog>
  );
}
