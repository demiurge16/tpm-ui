import React, { useContext, useEffect, useState } from 'react';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { useProjectContext } from './ProjectContext';
import { CreateTeamMember, Role, TeamMember } from '../../../client/types/project/TeamMember';
import { forkJoin, map } from 'rxjs';
import TpmClient from '../../../client/TpmClient';
import { Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form } from 'react-final-form';
import { AsyncSelectField } from '../../../components/form-controls/AsyncSelectField';
import { SelectField } from '../../../components/form-controls/SelectField';

export const ProjectTeamMembers = () => {
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
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
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
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
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
      </Box>
      
    </>
  );
}