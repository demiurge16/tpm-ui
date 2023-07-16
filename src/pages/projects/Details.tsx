import React, { SyntheticEvent, useEffect, useState, useContext } from "react";
import { Project } from "../../client/types/project/Project"
import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import TpmClient from "../../client/TpmClient";
import ProjectContextProvider, { useProjectContext } from "./details/ProjectContext";
import { ProjectDetails } from "./details/ProjectDetails";
import { ProjectStatusDetails } from "./details/ProjectStatusDetails";
import { CreateTeamMember, Role, TeamMember } from "../../client/types/project/TeamMember";
import { Form } from "react-final-form";
import { AsyncSelectField } from "../../components/form-controls/AsyncSelectField";
import { forkJoin, map } from "rxjs";
import { SelectField } from "../../components/form-controls/SelectField";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormApi } from "final-form";

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
      name: '',
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

  useEffect(() => {
    if (!id) return;

    TpmClient.getInstance()
      .projects()
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
            <Tab label="Status" {...a11yProps(1)} />
            <Tab label="Team members" {...a11yProps(2)} />
            <Tab label="Tasks" {...a11yProps(3)} />
            <Tab label="Expenses" {...a11yProps(4)} />
            <Tab label="Chats" {...a11yProps(5)} />
            <Tab label="Notes" {...a11yProps(6)} />
            <Tab label="Files" {...a11yProps(7)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ProjectDetails />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ProjectStatusDetails />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ProjectTeamMembers />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <ProjectTasks project={project} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <ProjectExpenses project={project} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <ProjectChats project={project} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <ProjectNotes project={project} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={7}>
          <ProjectFiles project={project} />
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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ProjectTasks = (props: { project: Project }) => {
  return (
    <div>
      <h1>Project Tasks</h1>
    </div>
  );
}

const ProjectExpenses = (props: { project: Project }) => {
  return (
    <div>
      <h1>Project Expenses</h1>
    </div>
  );
}

const ProjectChats = (props: { project: Project }) => {
  return (
    <div>
      <h1>Project Chats</h1>
    </div>
  );
}

const ProjectNotes = (props: { project: Project }) => {
  return (
    <div>
      <h1>Project Notes</h1>
    </div>
  );
}

const ProjectTeamMembers = () => {
  const snackbarContext = useContext(SnackbarContext);
  const { project, setProject } = useProjectContext();

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    if (!project) return;

    forkJoin({
      teamMembers: TpmClient.getInstance()
        .projects()
        .withId(project.id)
        .teamMembers()
        .all(),
      roles: TpmClient.getInstance()
        .projects()
        .refdata()
        .teamMembers()
        .roles()
    }).subscribe({
      next: (response) => {
        setTeamMembers(response.teamMembers.items);
        setRoles(response.roles);
      },
      error: (error) => snackbarContext.showError('Error loading reference data', error.message)
    });
  }, [project.id]);

  const addTeamMember = (teamMember: CreateTeamMember) =>
    TpmClient.getInstance()
      .projects()
      .withId(project.id)
      .teamMembers()
      .add(teamMember)
      .subscribe({
        next: (response) => {
          setTeamMembers([...teamMembers, response]);
          snackbarContext.showSuccess('Success', 'Team member added');
        },
        error: (error) => snackbarContext.showError('Error', error.message)
      });

  const removeTeamMember = (teamMember: TeamMember) =>
    TpmClient.getInstance()
      .projects()
      .withId(project.id)
      .teamMembers()
      .remove(teamMember.id)
      .subscribe({
        next: () => {
          setTeamMembers(teamMembers.filter((tm) => tm.id !== teamMember.id));
          snackbarContext.showSuccess('Success', 'Team member removed');
        },
        error: (error) => snackbarContext.showError('Error', error.message)
      });

  return (
    <>
      <Typography variant="h6" gutterBottom>Current team members</Typography>
      <List>
        {
          teamMembers.map((teamMember) => (
            <>
              <ListItem key={teamMember.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={`${teamMember.firstName} ${teamMember.lastName}`}/>
                </ListItemAvatar>
                <ListItemText
                  primary={`${teamMember.firstName} ${teamMember.lastName}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {teamMember.role.title}
                      </Typography>
                      {` — ${teamMember.email}`}
                    </React.Fragment>
                  }  
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => removeTeamMember(teamMember)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))
        }
      </List>
      
      <Box 
        sx={{
          pb: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>Add team member</Typography>
        <Form onSubmit={addTeamMember}
          initialValues={{
            userId: '',
            role: ''
          }}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <AsyncSelectField name="userId" label="User" required
                optionsLoader={(search: string) =>
                  TpmClient.getInstance()
                    .users()
                    .all({
                      page: 0,
                      pageSize: 25,
                      sort: [],
                      filters: [
                        {
                          field: 'name',
                          operator: 'contains',
                          value: search
                        }
                      ]
                    })
                    .pipe(
                      map(
                        (response) => {
                          return {
                            totalPages: response.totalPages,
                            totalElements: response.totalElements,
                            items: response.items.map((user) => ({ key: user.id, value: user.firstName + ' ' + user.lastName }))
                          };
                        }
                      )
                    )
                }
              />
              <SelectField name="role" label="Role" required
                options={roles.map((role) => ({ key: role.role, value: role.title }))}
              />

              <Button type="submit" variant="contained" color="primary" disabled={submitting || pristine}>Add</Button>
              <Button type="button" variant="contained" color="secondary" onClick={() => form.reset()} disabled={submitting || pristine}>Reset</Button>
            </form>
          )}
        />
      </Box>
      
    </>
  );
}

const ProjectFiles = (props: { project: Project }) => {
  return (
    <div>
      <h1>Project Files</h1>
    </div>
  );
}
