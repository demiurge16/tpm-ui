import React, { SyntheticEvent, useEffect, useState, useContext } from "react";
import { Project } from "../../client/types/project/Project"
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import ProjectContextProvider from "./details/ProjectContext";
import { ProjectDetails } from "./details/ProjectDetails";
import { ProjectTeamMembers } from "./details/ProjectTeamMembers";
import { ProjectFiles } from "./details/ProjectFiles";
import { ProjectExpenses } from "./details/ProjectExpenses";
import { ProjectTasks } from "./details/ProjectTasks";
import { ProjectThreads } from "./details/ProjectThreads";
import { useTpmClient } from "../../contexts/TpmClientContext";

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

  const { id } = useParams();

  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const tpmClient = useTpmClient();

  useEffect(() => {
    if (!id) return;

    tpmClient.projects()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setProject(response);
          breadcrumbsContext.setBreadcrumbs([
            { label: 'Project', path: '/projects' },
            { label: response.title, path: `/projects/${response.id}` },
          ]);
        },
        error: (error) => snackbarContext.showError(`Error loading project ${id}`, error.message)
      });
  }, [id]);


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

  return (
    <ProjectContextProvider project={project}>
      <Box>
        <Typography variant="h4" gutterBottom>{project.title}</Typography>
        <Typography variant="subtitle1" gutterBottom>{project.description}</Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="Team members" {...a11yProps(1)} />
            <Tab label="Tasks" {...a11yProps(2)} />
            <Tab label="Expenses" {...a11yProps(3)} />
            <Tab label="Threads" {...a11yProps(4)} />
            <Tab label="Files" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ProjectDetails />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ProjectTeamMembers />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ProjectTasks />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <ProjectExpenses />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <ProjectThreads />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <ProjectFiles />
        </CustomTabPanel>
      </Box>
    </ProjectContextProvider>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
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
