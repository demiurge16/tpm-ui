import { useContext, useEffect, useState } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, List, Typography } from "@mui/material";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { useProjectContext } from "./ProjectContext";
import { Note } from "../../../client/types/note/Note";
import TpmClient from "../../../client/TpmClient";
import { CreateNote } from "../../../client/types/project/Note";
import { Form } from "react-final-form";
import { TextField } from "../../../components/form-controls/TextField";
import DeleteIcon from '@mui/icons-material/Delete';

export const ProjectNotes = () => {
  const snackbarContext = useContext(SnackbarContext);
  const { project, setProject } = useProjectContext();

  const [notes, setNotes] = useState<Note[]>([]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });
  }

  useEffect(() => {
    if (!project) return;

    TpmClient.getInstance()
      .projects()
      .withId(project.id)
      .notes()
      .all()
      .subscribe({
        next: (response) => setNotes(response.items),
        error: (error) => snackbarContext.showError('Error loading notes', error.message)
      });
  }, [project.id]);

  const addNote = (note: CreateNote) =>
    TpmClient.getInstance()
      .projects()
      .withId(project.id)
      .notes()
      .create(note)
      .subscribe({
        next: (response) => {
          setNotes([...notes, response]);
          snackbarContext.showSuccess('Success', 'Note added');
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });

  const removeNote = (note: Note) =>
    TpmClient.getInstance()
      .notes()
      .withId(note.id)
      .delete()
      .subscribe({
        next: () => {
          setNotes(notes.filter((x) => x.id !== note.id));
          snackbarContext.showSuccess('Success', 'Note removed');
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Project notes</Typography>
      <Box pb={2} />
      <List>
        {notes.map((note) => (
          <Card key={note.id} sx={{ mb: 2 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'primary.main' }}
                  aria-label="note"
                  alt={note.author.firstName + ' ' + note.author.lastName}
                />
              }
              title={note.author.firstName + ' ' + note.author.lastName}
              subheader={formatDate(note.createdAt)}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {note.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="remove note" onClick={() => removeNote(note)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </List>

      <Box 
        sx={{
          pb: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>Add note</Typography>
        <Form onSubmit={addNote}
          keepDirtyOnReinitialize
          initialValues={{
            userId: '',
            role: ''
          }}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                  <TextField name="content" label="Content" multiline required/>
                </Grid>
                <Grid item xs={1} alignItems="stretch">
                  <Button type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={submitting || pristine}
                    size="large"
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button type="button"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
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
    </Box>
  );
}