import { useContext, useEffect, useState } from "react";
import { Observable } from "rxjs";
import { ProjectNewStatus, ProjectStatus, StatusCode } from "../../../client/types/project/Project";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import TpmClient from "../../../client/TpmClient";
import { Button, Grid, Typography } from "@mui/material";
import { useProjectContext } from "./ProjectContext";

type StatusTransition = {
  [key in StatusCode]: {
    [key in StatusCode]?: () => Observable<ProjectNewStatus>
  }
};

export const ProjectStatusDetails = () => {
  const snackbarContext = useContext(SnackbarContext);
  const { project, setProject } = useProjectContext();

  const [statuses, setStatuses] = useState<ProjectStatus[]>([]);

  const statusTransitions: StatusTransition = {
    "DRAFT": {
      "READY_TO_START": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .finishDraft()
    },
    "READY_TO_START": {
      "DRAFT": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .backToDraft(),
      "ACTIVE": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .startProgress(),
      "CANCELLED": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .reopen()
    },
    "ACTIVE": {
      "READY_TO_DELIVER": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .finishProgress(),
      "ON_HOLD": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .putOnHold(),
      "CANCELLED": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .cancel()
    },
    "READY_TO_DELIVER": {
      "ACTIVE": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .backToProgress(),
      "DELIVERED": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .deliver(),
      "CANCELLED": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .cancel()
    },
    "DELIVERED": {
      "INVOICED": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .invoice(),
      "CANCELLED": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .cancel()
    },
    "INVOICED": {
      "PAID": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .pay(),
      "CANCELLED": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .cancel()
    },
    "ON_HOLD": {
      "ACTIVE": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .resume(),
      "CANCELLED": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .cancel()
    },
    "CANCELLED": {
      "DRAFT": () => TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .reopen()
    },
    "PAID": {}
  };

  useEffect(() => {
    TpmClient.getInstance()
      .projects()
      .refdata()
      .statuses()
      .subscribe({
        next: (statuses) => {
          setStatuses(statuses);
        },
        error: (error) => {
          snackbarContext.showError('Failed to load statuses', error);
        }
      });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" gutterBottom>Project status</Typography>
        <Typography variant="body1">
          Status: {project.status.name}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" gutterBottom>Change status:</Typography>
        {
          Object.entries(statusTransitions[project.status.status])
            .map((key) => {
              const [statusCode, transition] = key;

              return (
                <Button
                  sx={{
                    marginRight: 1
                  }}
                  key={statusCode}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    transition()
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
                  }
                  }
                >
                  {statuses.find((status) => status.status === statusCode)?.name}
                </Button>
              );
            })
        }
      </Grid>
    </Grid>
  );
}