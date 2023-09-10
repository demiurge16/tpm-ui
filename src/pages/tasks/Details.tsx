import { useContext, useEffect, useState } from "react";
import { Task } from "../../client/types/task/Task";
import { useParams } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import { LoadingScreen } from "../utils/LoadingScreen";
import { useTpmClient } from "../../contexts/TpmClientContext";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { formatDate } from "../../utils/dateFormatters";

export const Details = () => {
  const { id } = useParams<{ id: string }>();
  const tpmClient = useTpmClient();
  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const snackbarContext = useContext(SnackbarContext);

  const [task, setTask] = useState<Task>({} as Task);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    tpmClient.tasks()
      .withId(id)
      .get()
      .subscribe({
        next: (task) => {
          setTask(task);
          setLoading(false);
        },
        error: (error) => {
          snackbarContext.showError(error.message, error.response.data.message);
          setLoading(false);
        }
      })
  }, []);

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <Box>
      <Typography variant="h4" gutterBottom>{task.title}</Typography>
      <Typography variant="body1" gutterBottom>{task.description}</Typography>

      <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h5" gutterBottom>Description</Typography>
        <Typography variant="body1">
          Languages (from -&gt; to): {`${task.sourceLanguage.name} -> ${task.targetLanguage.name}`}
        </Typography>
        <Typography variant="body1">
          Accuracy: {`${task.accuracy.name} (${task.accuracy.description})`}
        </Typography>
        <Typography variant="body1">
          Industry: {`${task.industry.name} (${task.industry.description})`}
        </Typography>
        <Typography variant="body1">
          Task size: {`${task.amount} ${task.unit.name}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Budget: {`${task.budget} ${task.currency.name}`}
        </Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Time frame</Typography>
        <Typography variant="body1">
          Expected start: {formatDate(task.expectedStart)}
        </Typography>
        <Typography variant="body1">
          Deadline: {formatDate(task.deadline)}
        </Typography>
      </Paper>
      <Box pb={2} />

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Task status</Typography>
        <Typography variant="body1" gutterBottom>
          {task.status.title}: {task.status.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Assignee: {
            task.assignee ? `${task.assignee.firstName} ${task.assignee.lastName}` : 'Not assigned'
          }
        </Typography>
      </Paper>
    </Box>
  );
};
