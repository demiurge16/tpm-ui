import { useContext, useEffect, useState } from "react";
import { useTpmClient } from "../../../contexts/TpmClientContext";
import { useTaskContext } from "./TaskContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { Assign } from "../../../client/types/task/Task";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { SelectField } from "../../../components/form-controls/SelectField";
import { TeamMember } from "../../../client/types/project/TeamMember";

export interface ChangeAssigneeDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ChangeAssigneeDialog = ({ open, onClose }: ChangeAssigneeDialogProps) => {
  const { task, setTask } = useTaskContext();
  const tpmClient = useTpmClient();
  const snackbarContext = useContext(SnackbarContext);

  const [serverError, setServerError] = useState<string | null>(null);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    tpmClient.projects()
      .withId(task.project.id)
      .teamMembers()
      .all()
      .subscribe({
        next: (response) => {
          setTeamMembers(response.items);
        },
        error: (error) => {
          snackbarContext.showError(error.message, error.response.data.message);
          setServerError(error.response.data.message || error.message);
        }
      });
  }, []);

  const handleSubmit = (data: Assign) =>
    tpmClient.tasks()
      .withId(task.id)
      .assignTeamMember(data)
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess("Success", "Assignee changed");
          setTask({
            ...task,
            assignee: response.newAssignee
          });
          onClose();
        },
        error: (error) => {
          snackbarContext.showError(error.message, error.response.data.message);
          setServerError(error.response.data.message || error.message);
        }
      });
  
  const handleUnassign = () =>
    tpmClient.tasks()
      .withId(task.id)
      .unassignTeamMember()
      .subscribe({
        next: (response) => {
          snackbarContext.showSuccess("Success", "Assignee removed");
          setTask({
            ...task,
            assignee: null
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
      aria-labelledby="change-assignee-dialog-title"
      aria-describedby="change-assignee-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{
          userId: task.assignee?.userId
        }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <DialogTitle id="change-assignee-dialog-title">Change assignee</DialogTitle>
            <DialogContent>
              <SelectField name="userId" label="Team member" required
                options={teamMembers.map((teamMember) => ({
                  key: teamMember.userId,
                  value: `${teamMember.firstName} ${teamMember.lastName}`
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
              <Button variant="contained" color="primary" type="submit" disabled={submitting || pristine}>Change assignee</Button>
              <Button variant="contained" color="secondary" onClick={handleUnassign}>Remove assignee</Button>
            </DialogActions>
          </form>
        )}
      />
    </Dialog>
  );
}
