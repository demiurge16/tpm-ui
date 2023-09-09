import { useContext, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useTpmClient } from "../../../contexts/TpmClientContext";
import { Form } from "react-final-form";
import { DateTimeField } from "../../../components/form-controls/DateTimeField";
import { ProjectMoveStart } from "../../../client/types/project/Project";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { useProjectContext } from "./ProjectContext";
import { DateTime } from "luxon";

export interface MoveStartDialogProps {
  projectId: string;
  open: boolean;
  onClose: () => void;
}

export const MoveStartDialog = ({ projectId, open, onClose }: MoveStartDialogProps) => {
  const { project, setProject } = useProjectContext();
  const tpmClient = useTpmClient();
  const snackbarContext = useContext(SnackbarContext);

  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = (data: ProjectMoveStart) =>
    tpmClient.projects()
      .withId(projectId)
      .moveStart(data)
      .subscribe({
        next: () => {
          snackbarContext.showSuccess("Success", "Start date moved");
          setProject({
            ...project,
            expectedStart: data.expectedStart
          });
          onClose();
        },
        error: (error) => {
          snackbarContext.showError(error.message, error.response.data.message);
          setServerError(error.response.data.message || error.message);
        }
      });

  return project.expectedStart && (
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
          expectedStart: project.expectedStart
        }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <DialogTitle id="move-start-dialog-title">Move start date</DialogTitle>
            <DialogContent>
              <DateTimeField name="expectedStart" label="Expected Start" required />

              <Box pb={2} />
              {serverError && (
                <Typography color="error">Error: {serverError}</Typography>
              )}
              <Box pb={2} />
            </DialogContent>
            <DialogActions>
              <Button type="submit" disabled={submitting || pristine}>
                Move start date
              </Button>
              <Button type="button"
                disabled={submitting}
                onClick={() => {
                  form.reset();
                  onClose();
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        )}
      />
    </Dialog>
  );
}