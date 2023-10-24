import { useEffect, useState } from "react";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { Thread } from "../../client/types/thread/Thread";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, List, Paper, Typography } from "@mui/material";
import { Threads } from "./Threads";
import { Link } from "react-router-dom";
import { HtmlPanel } from "../../components/editor/HtmlPanel";
import { formatDate } from "../../utils/dateFormatters";
import { applicationClient } from "../../client/ApplicationClient";
import { LoadingScreen } from "../utils/LoadingScreen";

export const Index = () => {
  const { showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();

  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    applicationClient.threads()
      .all()
      .subscribe({
        next: (response) => {
          setThreads(response.items);
          setLoading(false);
        },
        error: (error) => showError('Error loading threads', error.message)
      });

    setBreadcrumbs([
      { label: 'Threads', path: '/threads' }
    ]);
  }, [setBreadcrumbs, applicationClient, showError]);

  return (
    <Box>
      <Typography variant="h4">{Threads.title}</Typography>
      <Typography variant="subtitle1">{Threads.description}</Typography>
      <Box pb={2} />

      {
        loading ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <LoadingScreen />
          </Paper>
        ) : (
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
                    subheader={formatDate(note.createdAt) + ' in project ' + note.project.title}
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
                    <Button variant="text"
                      color="primary"
                      component={Link}
                      to={`/projects/${note.project.id}`}
                    >
                      Go to project
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </List>
          </Paper>
        )
      }
    </Box>
  );
};
