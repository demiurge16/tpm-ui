import { useContext, useEffect, useState } from "react";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, Link as MuiLink, List, Typography, Button } from "@mui/material";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { useProjectContext } from "./ProjectContext";
import { Thread } from "../../../client/types/thread/Thread";
import TpmClient from "../../../client/TpmClient";
import { CreateThread } from "../../../client/types/project/Thread";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { Html } from "@mui/icons-material";
import { HtmlPanel } from "../../../components/editor/HtmlPanel";
import { formatDate } from "../../../utils/dateFormatters";

export const ProjectThreads = () => {
  const snackbarContext = useContext(SnackbarContext);
  const { project, setProject } = useProjectContext();

  const [notes, setNotes] = useState<Thread[]>([]);

  useEffect(() => {
    if (!project) return;

    TpmClient.getInstance()
      .projects()
      .withId(project.id)
      .threads()
      .all()
      .subscribe({
        next: (response) => setNotes(response.items),
        error: (error) => snackbarContext.showError('Error loading threads', error.message)
      });
  }, [project.id]);

  const addThread = (note: CreateThread) =>
    TpmClient.getInstance()
      .projects()
      .withId(project.id)
      .threads()
      .create(note)
      .subscribe({
        next: (response) => {
          setNotes([...notes, response]);
          snackbarContext.showSuccess('Success', 'Note added');
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });

  const removeThread = (note: Thread) =>
    TpmClient.getInstance()
      .threads()
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
      <Typography variant="h5" gutterBottom>Project threads</Typography>
      <Box pb={2} />
      {
        notes.length === 0 && (
          <Typography variant="body1" gutterBottom>
            Project has no open discussions yet. <MuiLink component={Link} to={`threads/create`}>Be first to start one</MuiLink>
          </Typography>
        )
      }
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
              <Typography variant="h5" component="div" gutterBottom>
                {note.title}
              </Typography>
              <HtmlPanel html={note.content} />
            </CardContent>
            <CardActions disableSpacing>
              <Button variant="text"
                color="primary"
                component={Link}
                to={`/threads/${note.id}`}
              >
                Show thread
              </Button>
            </CardActions>
          </Card>
        ))}
      </List>
      { notes.length !== 0 && <MuiLink component={Link} to={`threads/create`}>Create new thread</MuiLink> }
    </Box>
  );
}