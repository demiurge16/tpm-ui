import { useContext, useEffect, useState } from "react";
import { Observable } from "rxjs";
import { ProjectNewStatus, ProjectStatus, StatusCode } from "../../../client/types/project/Project";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { Button, Grid, Typography } from "@mui/material";
import { useProjectContext } from "./ProjectContext";
import { useTpmClient } from "../../../contexts/TpmClientContext";

type StatusTransition = {
  [key in StatusCode]: {
    [key in StatusCode]?: () => Observable<ProjectNewStatus>
  }
};

export const ProjectStatusDetails = () => {
  const snackbarContext = useContext(SnackbarContext);
  const { project, setProject } = useProjectContext();
  const tpmClient = useTpmClient();

  const [statuses, setStatuses] = useState<ProjectStatus[]>([]);

  const statusTransitions: StatusTransition = {
    "DRAFT": {
      "READY_TO_START": () => tpmClient.projects()
        .withId(project.id)
        .finishDraft()
    },
    "READY_TO_START": {
      "DRAFT": () => tpmClient.projects()
        .withId(project.id)
        .backToDraft(),
      "ACTIVE": () => tpmClient.projects()
        .withId(project.id)
        .startProgress(),
      "CANCELLED": () => tpmClient
        .projects()
        .withId(project.id)
        .reopen()
    },
    "ACTIVE": {
      "READY_TO_DELIVER": () => tpmClient.projects()
        .withId(project.id)
        .finishProgress(),
      "ON_HOLD": () => tpmClient.projects()
        .withId(project.id)
        .putOnHold(),
      "CANCELLED": () => tpmClient.projects()
        .withId(project.id)
        .cancel()
    },
    "READY_TO_DELIVER": {
      "ACTIVE": () => tpmClient.projects()
        .withId(project.id)
        .backToProgress(),
      "DELIVERED": () => tpmClient.projects()
        .withId(project.id)
        .deliver(),
      "CANCELLED": () => tpmClient.projects()
        .withId(project.id)
        .cancel()
    },
    "DELIVERED": {
      "INVOICED": () => tpmClient.projects()
        .withId(project.id)
        .invoice(),
      "CANCELLED": () => tpmClient.projects()
        .withId(project.id)
        .cancel()
    },
    "INVOICED": {
      "PAID": () => tpmClient.projects()
        .withId(project.id)
        .pay(),
      "CANCELLED": () => tpmClient.projects()
        .withId(project.id)
        .cancel()
    },
    "ON_HOLD": {
      "ACTIVE": () => tpmClient.projects()
        .withId(project.id)
        .resume(),
      "CANCELLED": () => tpmClient.projects()
        .withId(project.id)
        .cancel()
    },
    "CANCELLED": {
      "DRAFT": () => tpmClient.projects()
        .withId(project.id)
        .reopen()
    },
    "PAID": {}
  };

  useEffect(() => {
    tpmClient.projects()
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
          Status: {project.status.title}
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
                  }}
                >
                  {statuses.find((status) => status.status === statusCode)?.title}
                </Button>
              );
            })
        }
      </Grid>
    </Grid>
  );
}