import { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { DateTimeField } from "../../../../components/form-controls/DateTimeField";
import { ProjectMoveDeadline } from "../../../../client/types/project/Project";
import { useSnackbarContext } from "../../../../contexts/SnackbarContext";
import { useProjectContext } from "../context/ProjectContext";
import { applicationClient } from "../../../../client/ApplicationClient";

export interface MoveDeadlinesDialogProps {
  projectId: string;
  open: boolean;
  onClose: () => void;
}

export const MoveDeadlinesDialog = ({ projectId, open, onClose }: MoveDeadlinesDialogProps) => {
  const { project, setProject } = useProjectContext();
  const { showSuccess, showError } = useSnackbarContext();

  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = (data: ProjectMoveDeadline) =>
    applicationClient.projects()
      .withId(projectId)
      .moveDeadline(data)
      .subscribe({
        next: () => {
          showSuccess("Success", "Deadlines moved");
          setProject({
            ...project,
            internalDeadline: data.internalDeadline,
            externalDeadline: data.externalDeadline
          });
          onClose();
        },
        error: (error) => {
          showError(error.message, error.response.data.message);
          setServerError(error.response.data.message || error.message);
        }
      });

  return project.internalDeadline && project.externalDeadline && (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="move-deadlines-dialog-title"
      aria-describedby="move-deadlines-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <Form onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{
          internalDeadline: project.internalDeadline,
          externalDeadline: project.externalDeadline
        }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <DialogTitle id="move-deadlines-dialog-title">Move deadlines</DialogTitle>
            <DialogContent>
              <DateTimeField name="internalDeadline" label="Internal Deadline" required />
              <DateTimeField name="externalDeadline" label="External Deadline" required />

              <Box pb={2} />
              {serverError && (
                <Typography color="error">Error: {serverError}</Typography>
              )}
              <Box pb={2} />
            </DialogContent>
            <DialogActions>
              <Button type="button"
                disabled={submitting}
                onClick={() => {
                  form.reset();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={submitting || pristine}>
                Move deadlines
              </Button>
            </DialogActions>
          </form>
        )}
      />
    </Dialog>
  );
}