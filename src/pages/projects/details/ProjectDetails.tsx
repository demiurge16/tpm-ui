import { useContext, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useProjectContext } from "./ProjectContext";
import { formatDate } from "../../../utils/dateFormatters";
import { createStatusTransitionHandler } from "./ProjectStatusTransitionHandlers";
import { useTpmClient } from "../../../contexts/TpmClientContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { MoveStartDialog } from "./ProjectMoveStartDialog";
import { MoveDeadlinesDialog } from "./ProjectMoveDeadlinesDialog";
import { Link } from "react-router-dom";

export const ProjectDetails = () => {
  const snackbarContext = useContext(SnackbarContext);
  const { project, setProject } = useProjectContext();
  const tpmClient = useTpmClient();
  const statusTransitionHandlers = createStatusTransitionHandler(tpmClient, project.id);

  const [moveStartDialogOpen, setMoveStartDialogOpen] = useState(false);
  const [moveDeadlinesDialogOpen, setMoveDeadlinesDialogOpen] = useState(false);

  const openMoveStartDialog = () => {
    setMoveStartDialogOpen(true);
  }

  const closeMoveStartDialog = () => {
    setMoveStartDialogOpen(false);
  }

  const openMoveDeadlinesDialod = () => {
    setMoveDeadlinesDialogOpen(true);
  }

  const closeMoveDeadlinesDialog = () => {
    setMoveDeadlinesDialogOpen(false);
  }

  return (
    <>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Details</Typography>
        <Typography variant="body1">
          Languages (from -&gt; to): {`${project.sourceLanguage.name} -> ${project.targetLanguages.map((language) => language.name).join(', ')}`}
        </Typography>
        <Typography variant="body1">
          Accuracy: {`${project.accuracy.name} (${project.accuracy.description})`}
        </Typography>
        <Typography variant="body1">
          Industry: {`${project.industry.name} (${project.industry.description})`}
        </Typography>
        <Typography variant="body1">
          Service types: {
            project.serviceTypes.map((serviceType) => `${serviceType.name} (${serviceType.description})`).join(', ')
          }
        </Typography>
        <Typography variant="body1">
          Project size: {`${project.amount} ${project.unit.name}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Budget: {`${project.budget} ${project.currency.name}`}
        </Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Time frame</Typography>
        <Typography variant="body1">
          Expected start: {formatDate(project.expectedStart)}
        </Typography>
        <Typography variant="body1">
          Internal deadline: {formatDate(project.internalDeadline)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          External deadline: {formatDate(project.externalDeadline)}
        </Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Client</Typography>
        <Typography variant="body1">
          Name: {`${project.client.name}`}
        </Typography>
        <Typography variant="body1">
          Email: {project.client.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Phone: {project.client.phone}
        </Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Project status</Typography>
        <Typography variant="body1" gutterBottom>
          {project.status.title}: {project.status.description}
        </Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Actions</Typography>
        <Button variant="contained" color="primary" component={Link} to="edit"
          sx={{
            marginRight: 1
          }}
        >
          Edit
        </Button>

        <Button variant="contained" color="primary" onClick={() => openMoveStartDialog()}
          sx={{
            marginRight: 1
          }}
        >
          Move start date
        </Button>
        <MoveStartDialog projectId={project.id} open={moveStartDialogOpen} onClose={closeMoveStartDialog} />

        <Button variant="contained" color="primary" onClick={() => openMoveDeadlinesDialod()}
          sx={{
            marginRight: 1
          }}
        >
          Move deadlines
        </Button>
        <MoveDeadlinesDialog projectId={project.id} open={moveDeadlinesDialogOpen} onClose={closeMoveDeadlinesDialog} />

        {
            Object.entries(statusTransitionHandlers[project.status.status])
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
                            setProject({
                              ...project,
                              status: status.status
                            });
                            
                            snackbarContext.showSuccess('Success', 'Project status changed');
                          },
                          error: (error) => {
                            snackbarContext.showError('Failed to change project status', error.message);
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
}