import { useEffect, useState } from "react";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Link as MuiLink, List, Typography, Button, Chip, Paper } from "@mui/material";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { useProjectContext } from "./context/ProjectContext";
import { Thread } from "../../../client/types/thread/Thread";
import { Link } from "react-router-dom";
import { HtmlPanel } from "../../../components/editor/HtmlPanel";
import { formatDateTime } from "../../../utils/dateFormatters";
import { applicationClient } from "../../../client/ApplicationClient";
import { LoadingScreen } from "../../utils/LoadingScreen";

export const ProjectThreads = () => {
  const { showError } = useSnackbarContext();
  const { project } = useProjectContext();

  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!project) return;

    applicationClient.projects()
      .withId(project.id)
      .threads()
      .all()
      .subscribe({
        next: (response) => {
          setThreads(response.items);
          setLoading(false);
        },
        error: (error) => showError('Error loading threads', error.message)
      });
  }, [project, project.id, showError, applicationClient]);

  return ( 
    <Box>
      <Typography variant="h5" gutterBottom>Project threads</Typography>
      <Box pb={2} />
      {
        loading ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <LoadingScreen />
          </Paper>
        ) : (
          <>
            {
              threads.length === 0 && (
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    Project has no open discussions yet. <MuiLink component={Link} to={`threads/create`}>Be first to start one</MuiLink>
                  </Typography>
                </Paper>
              )
            }
            <Paper elevation={2} sx={{ p: 2 }}>
              <List>
                {threads.map((note) => (
                  <Card key={note.id} sx={{ mb: 2 }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: 'primary.main' }}
                          aria-label="note"
                          alt={note.author.firstName + ' ' + note.author.lastName}
                        />
                      }
                      title={note.author.firstName + ' ' + note.author.lastName}
                      subheader={formatDateTime(note.createdAt)}
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
            </Paper>
            <Box pb={2} />

            { threads.length !== 0 && 
              <Paper elevation={2} sx={{ p: 2 }}>
                <Button variant="contained" color="primary" component={Link} to="threads/create">Start new thread</Button>
              </Paper>
            }
          </>
        )
      }
    </Box>
  );
}