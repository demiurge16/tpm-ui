import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { Project } from "../../client/types/project/Project"
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import ProjectContextProvider from "./details/context/ProjectContext";
import { ProjectDetails } from "./details/ProjectDetails";
import { ProjectTeamMembers } from "./details/ProjectTeamMembers";
import { ProjectFiles } from "./details/ProjectFiles";
import { ProjectExpenses } from "./details/ProjectExpenses";
import { ProjectTasks } from "./details/ProjectTasks";
import { ProjectThreads } from "./details/ProjectThreads";
import { useTpmClient } from "../../contexts/TpmClientContext";
import { LoadingScreen } from "../utils/LoadingScreen";

export const Details = () => {
  const [project, setProject] = useState<Project>({
    id: '',
    title: '',
    description: '',
    sourceLanguage: {
      code: '',
      name: ''
    },
    targetLanguages: [],
    accuracy: {
      id: '',
      name: '',
      description: ''
    },
    industry: {
      id: '',
      name: '',
      description: ''
    },
    unit: {
      id: '',
      name: '',
      description: ''
    },
    serviceTypes: [],
    amount: 0,
    expectedStart: new Date(),
    internalDeadline: new Date(),
    externalDeadline: new Date(),
    budget: 0,
    currency: {
      code: '',
      name: ''
    },
    status: {
      status: 'DRAFT',
      title: '',
      description: ''
    },
    client: {
      id: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: {
        code: '',
        name: ''
      },
      vat: '',
      notes: '',
      type: {
        id: '',
        name: '',
        description: '',
        corporate: false,
      },
      active: false
    }
  });

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const { showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();;
  const tpmClient = useTpmClient();

  useEffect(() => {
    if (!id) return;

    tpmClient.projects()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setProject(response);
          setBreadcrumbs([
            { label: 'Project', path: '/projects' },
            { label: response.title, path: `/projects/${response.id}` },
          ]);
          setLoading(false);
        },
        error: (error) => showError(`Error loading project ${id}`, error.message)
      });
  }, [id, setBreadcrumbs, showError, tpmClient]);


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
