import { useContext, useEffect, useState } from "react";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Link as MuiLink, List, Typography, Button, Chip } from "@mui/material";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { useProjectContext } from "./ProjectContext";
import { Thread } from "../../../client/types/thread/Thread";
import { Link } from "react-router-dom";
import { HtmlPanel } from "../../../components/editor/HtmlPanel";
import { formatDate } from "../../../utils/dateFormatters";
import { useTpmClient } from "../../../contexts/TpmClientContext";

export const ProjectThreads = () => {
  const snackbarContext = useContext(SnackbarContext);
  const { project, setProject } = useProjectContext();
  const tpmClient = useTpmClient();

  const [notes, setNotes] = useState<Thread[]>([]);

  useEffect(() => {
    if (!project) return;

    tpmClient.projects()
      .withId(project.id)
      .threads()
      .all()
      .subscribe({
        next: (response) => setNotes(response.items),
        error: (error) => snackbarContext.showError('Error loading threads', error.message)
      });
  }, [project.id]);

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
              action={note.tags.map((tag) => <Chip key={tag.id} label={tag.name} sx={{ mr: 1 }} />)}
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