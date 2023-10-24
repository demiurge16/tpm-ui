import { useEffect, useState } from "react";
import { Task } from "../../client/types/task/Task";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import { LoadingScreen } from "../utils/LoadingScreen";
import { applicationClient } from "../../client/ApplicationClient";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import TaskContextProvider from "./details/TaskContext";
import { TaskDetails } from "./details/TaskDetails";

export const Details = () => {
  const { id } = useParams<{ id: string }>();
  const { showError } = useSnackbarContext();

  const [task, setTask] = useState<Task>({} as Task);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if (!id) {
      return;
    }

    applicationClient.tasks()
      .withId(id)
      .get()
      .subscribe({
        next: (task) => {
          setTask(task);
          setLoading(false);
        },
        error: (error) => {
          showError(error.message, error.response.data.message);
          setLoading(false);
        }
      })
  }, [id, showError, applicationClient]);

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <TaskContextProvider task={task}>
      <TaskDetails />
    </TaskContextProvider>
  );
};
