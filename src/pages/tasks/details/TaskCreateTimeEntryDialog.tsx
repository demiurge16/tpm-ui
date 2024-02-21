import { useState } from "react";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { useTaskContext } from "./TaskContext";
import { TimeUnit } from "../../../client/types/task/TimeEntry";
import { applicationClient } from "../../../client/ApplicationClient";
import { CreateTimeEntry } from "../../../client/types/task/Task";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import { DateField } from "../../../components/form-controls/DateField";
import { NumberField } from "../../../components/form-controls/NumberField";
import { SelectField } from "../../../components/form-controls/SelectField";
import { useAuth } from "../../../contexts/AuthContext";
import { TeamMember } from "../../../client/types/project/TeamMember";

export interface TaskCreateTimeEntryDialogProps {
  open: boolean;
  onClose: () => void;
  timeUnits: TimeUnit[];
  teamMembers: TeamMember[];
}

export const TaskCreateTimeEntryDialog = (
  { open, onClose, timeUnits, teamMembers }: TaskCreateTimeEntryDialogProps
) => {
  const { task } = useTaskContext();
  const { userId, roles } = useAuth();
  const { showSuccess, showError } = useSnackbarContext();

  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = (data: CreateTimeEntry) =>
    applicationClient.tasks()
      .withId(task.id)
      .timeEntries()
      .create(data)
      .subscribe({
        next: () => {
          showSuccess("Success", "Time entry created");
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
      aria-labelledby="create-time-entry-dialog-title"
      aria-describedby="create-time-entry-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{ userId: userId }}
        render={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <DialogTitle id="create-time-entry-dialog-title">Create time entry</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DateField name="date" label="Date" required />
                </Grid>
                <Grid item xs={6}>
                  <NumberField name="timeSpent" label="Time spent" required />
                </Grid>
                <Grid item xs={6}>
                  <SelectField name="timeUnit" label="Time unit" required
                    options={timeUnits.map((unit) => ({
                      key: unit.unit,
                      value: unit.title
                    }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectField name="userId" label="User" required
                    disabled={!(roles.includes('admin') || roles.includes('project-manager'))}
                    options={teamMembers.map((tm) => ({
                      key: tm.userId,
                      value: tm.firstName + ' ' + tm.lastName
                    }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="description" label="Description" required multiline rows={4}/>
                </Grid>
                <Grid item xs={12}>
                  {serverError && (
                    <Typography color="error">Error: {serverError}</Typography>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button variant="contained" color="primary" type="submit" disabled={submitting || pristine}>Create time entry</Button>
            </DialogActions>
          </form>
        )}
      />
    </Dialog>
  );
}