import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { Task } from "../../client/types/task/Task";
import { useParams } from "react-router-dom";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { LoadingScreen } from "../utils/LoadingScreen";
import { applicationClient } from "../../client/ApplicationClient";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import TaskContextProvider from "./details/TaskContext";
import { TaskDetails } from "./details/TaskDetails";
import { TaskTimeEntries } from "./details/TaskTimeEntries";

const Details = () => {
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

  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen />
    </Paper>
  ) : (
    <TaskContextProvider task={task}>
      <Box>
        <Typography variant="h4" gutterBottom>{task.title}</Typography>
        <Typography variant="subtitle1" gutterBottom>{task.description}</Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="task tabs">
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="Time Entries" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TaskDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TaskTimeEntries />
        </TabPanel>
      </Box>
    </TaskContextProvider>
  );
};

export default Details;

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
