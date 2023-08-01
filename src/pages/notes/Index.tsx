import { useContext, useEffect, useState } from "react";
import TpmClient from "../../client/TpmClient";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { Note } from "../../client/types/note/Note";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, List, Typography } from "@mui/material";
import { Notes } from "./Tasks";
import { Link } from "react-router-dom";

export const Index = () => {
  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

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
    TpmClient.getInstance()
      .notes()
      .all()
      .subscribe({
        next: (response) => setNotes(response.items),
        error: (error) => snackbarContext.showError('Error loading notes', error.message)
      });
    
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Notes', path: '/notes' }
    ]);
  }, []);

  return (
    <Box>
      <Typography variant="h4">{Notes.title}</Typography>
      <Typography variant="subtitle1">{Notes.description}</Typography>
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
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {note.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
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
