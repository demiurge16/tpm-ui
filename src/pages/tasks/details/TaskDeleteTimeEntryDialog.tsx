import { useState } from "react";
import { TimeEntry } from "../../../client/types/task/TimeEntry";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { applicationClient } from "../../../client/ApplicationClient";

interface TaskDeleteTimeEntryDialogProps {
  open: boolean;
  onClose: () => void;
  timeEntry: TimeEntry;
}

export const DeleteTimeEntryDialog = (
  { open, onClose, timeEntry }: TaskDeleteTimeEntryDialogProps
) => {
  const { showSuccess, showError } = useSnackbarContext();
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-time-entry-dialog-title"
      aria-describedby="delete-time-entry-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="delete-time-entry-dialog-title">Delete Time Entry</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this time entry? This action cannot be undone.
        </Typography>
        <Typography variant="body1">
          {`Entry by ${timeEntry.user.firstName} ${timeEntry.user.lastName} on ${timeEntry.date} for ${timeEntry.timeSpent} ${timeEntry.timeUnit.title}`}
        </Typography>
        <Typography variant="body1">
          {`Description: ${timeEntry.description}`}
        </Typography>
        {serverError && <Typography variant="body1" color="error">{`Error: ${serverError}`}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary"
          onClick={() =>
            applicationClient.timeEntries()
              .withId(timeEntry.id)
              .delete()
              .subscribe({
                next: () => {
                  showSuccess("Success", "Time entry deleted");
                  onClose();
                },
                error: (error) => {
                  showError(error.message, error.response.data.message);
                  setServerError(error.response.data.message || error.message);
                }
              })
          }
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}