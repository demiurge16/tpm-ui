import { useEffect, useState } from 'react';
import { useSnackbarContext } from '../../../contexts/SnackbarContext';
import { useProjectContext } from './ProjectContext';
import { CreateTeamMember, ProjectRole, TeamMember, TeamMemberProjectRole } from '../../../client/types/project/TeamMember';
import { forkJoin } from 'rxjs';
import { Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form } from 'react-final-form';
import { AsyncSelectField } from '../../../components/form-controls/AsyncSelectField';
import { SelectField } from '../../../components/form-controls/SelectField';
import { useTpmClient } from '../../../contexts/TpmClientContext';
import { LoadingScreen } from '../../utils/LoadingScreen';
import { SecuredComponent } from '../../../components/security/SecuredComponent';

export const ProjectTeamMembers = () => {
  const { showSuccess, showError } = useSnackbarContext();
  const { project } = useProjectContext();
  const tpmClient = useTpmClient();

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [roles, setRoles] = useState<ProjectRole[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!project) return;

    forkJoin({
      teamMembers: tpmClient.projects()
        .withId(project.id)
        .teamMembers()
        .all(),
      roles: tpmClient.projects()
        .refdata()
        .teamMembers()
        .roles()
    }).subscribe({
      next: (response) => {
        setTeamMembers(response.teamMembers.items);
        setRoles(response.roles);
        setLoading(false);
      },
      error: (error) => showError('Error loading reference data', error.message)
    });
  }, [project, project.id, showError, tpmClient]);

  const addTeamMember = (teamMember: CreateTeamMember) =>
    tpmClient.projects()
      .withId(project.id)
      .teamMembers()
      .add(teamMember)
      .subscribe({
        next: (response) => {
          setTeamMembers([...teamMembers, response]);
          showSuccess('Success', 'Team member added');
        },
        error: (error) => showError(error.message, error.response.data.message)
      });

  const removeTeamMember = (teamMember: TeamMemberProjectRole) =>
    tpmClient.projects()
      .withId(project.id)
      .teamMembers()
      .remove(teamMember.projectRoleId)
      .subscribe({
        next: () => {
          setTeamMembers(teamMembers.filter((tm) => tm.id !== teamMember.projectRoleId));
          showSuccess('Success', 'Team member removed');
        },
        error: (error) => showError(error.message, error.response.data.message)
      });

  return loading ? (
    <Paper elevation={2} sx={{ p: 2 }}>
      <LoadingScreen /> 
    </Paper>
  ) : (
    <>
      <Paper elevation={2} sx={{ p: 2 }}>
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
                      <>
                        {teamMember.email}
                      </>
                    }  
                  />
                </ListItem>
                <Divider key={`${teamMember.id}-divider`} variant="inset" component="li" />
                {
                  teamMember.roles.map((role) => (
                    <ListItem key={`${teamMember.id}-${role.role}`} alignItems="flex-start">
                      <ListItemAvatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={role.title}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              {role.description}
                            </Typography>
                          </>
                        }  
                      />
                      <SecuredComponent roles={['admin', 'project-manager']}>
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" onClick={() => removeTeamMember(role)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </SecuredComponent>
                    </ListItem>
                  ))
                }
                <Divider key={`${teamMember.id}-divider-roles`} variant="inset" component="li" />
              </>
            ))
          }
        </List>
      </Paper>
      <Box pb={2} />
      
      <SecuredComponent roles={['admin', 'project-manager']}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Add team member</Typography>
          <Form onSubmit={addTeamMember}
            keepDirtyOnReinitialize
            initialValues={{
              userId: '',
              role: ''
            }}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={5}>
                    <AsyncSelectField name="userId" label="User" required
                      searchQueryProvider={(search) => (
                        {
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
                        }
                      )}
                      resultFormatter={(user) => ({ key: user.id, value: user.firstName + ' ' + user.lastName })}
                      optionsLoader={tpmClient.users().all}
                    />  
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <SelectField name="role" label="Role" required
                      options={roles.map((role) => ({ key: role.role, value: role.title }))}
                    />  
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Button type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size='large'
                      disabled={submitting || pristine}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Button type="button"
                      variant="contained"
                      color="secondary"
                      fullWidth
                      size='large'
                      onClick={() => form.reset()}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </Paper>
      </SecuredComponent>
    </>
  );
}