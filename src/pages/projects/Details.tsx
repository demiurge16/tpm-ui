import { ReactNode, SyntheticEvent, useState } from "react";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import ProjectContextProvider from "./details/context/ProjectContext";
import { ProjectDetails } from "./details/ProjectDetails";
import { ProjectTeamMembers } from "./details/ProjectTeamMembers";
import { ProjectFiles } from "./details/ProjectFiles";
import { ProjectExpenses } from "./details/ProjectExpenses";
import { ProjectTasks } from "./details/ProjectTasks";
import { ProjectThreads } from "./details/ProjectThreads";
import { applicationClient } from "../../client/ApplicationClient";
import { LoadingScreen } from "../utils/LoadingScreen";
import { useRefdata } from "../../components/form/useRefdata";

export const Details = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error('Project ID is required');
  }

  const { setBreadcrumbs } = useBreadcrumbsContext();

  const { loading, refdata } = useRefdata(
    {
      project: applicationClient.projects().withId(id).get(),
    },
    (result) => setBreadcrumbs([
      { label: "Projects", path: "/projects" },
      { label: result.project.title, path: `/projects/${result.project.id}` }
    ])
  );

  const { project } = refdata;

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
    <ProjectContextProvider project={project}>
      <Box>
        <Typography variant="h4" gutterBottom>{project.title}</Typography>
        <Typography variant="subtitle1" gutterBottom>{project.description}</Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="project tabs">
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="Team members" {...a11yProps(1)} />
            <Tab label="Tasks" {...a11yProps(2)} />
            <Tab label="Expenses" {...a11yProps(3)} />
            <Tab label="Threads" {...a11yProps(4)} />
            <Tab label="Files" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ProjectDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProjectTeamMembers />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProjectTasks />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ProjectExpenses />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ProjectThreads />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <ProjectFiles />
        </TabPanel>
      </Box>
    </ProjectContextProvider>
  );
};

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
