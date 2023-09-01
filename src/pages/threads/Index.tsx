import { useContext, useEffect, useState } from "react";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { Thread } from "../../client/types/thread/Thread";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, List, Typography } from "@mui/material";
import { Threads } from "./Threads";
import { Link } from "react-router-dom";
import TpmClient from "../../client/TpmClient";
import { HtmlPanel } from "../../components/editor/HtmlPanel";
import { formatDate } from "../../utils/dateFormatters";

export const Index = () => {
  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const [notes, setNotes] = useState<Thread[]>([]);

  useEffect(() => {
    TpmClient.getInstance()
      .threads()
      .all()
      .subscribe({
        next: (response) => setNotes(response.items),
        error: (error) => snackbarContext.showError('Error loading threads', error.message)
      });

    breadcrumbsContext.setBreadcrumbs([
      { label: 'Threads', path: '/threads' }
    ]);
  }, []);

  return (
    <Box>
      <Typography variant="h4">{Threads.title}</Typography>
      <Typography variant="subtitle1">{Threads.description}</Typography>
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
    </Box>
  );
};
