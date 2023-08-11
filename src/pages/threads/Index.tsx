import { useContext, useEffect, useState } from "react";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { Thread } from "../../client/types/thread/Thread";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, List, Typography } from "@mui/material";
import { Threads } from "./Threads";
import { Link } from "react-router-dom";

export const Index = () => {
  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const [notes, setNotes] = useState<Thread[]>([]);

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
    // TpmClient.getInstance()
    //   .notes()
    //   .all()
    //   .subscribe({
    //     next: (response) => setNotes(response.items),
    //     error: (error) => snackbarContext.showError('Error loading notes', error.message)
    //   });

    setNotes([
      {
        id: '1',
        title: 'Thread 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.',
        createdAt: new Date(),
        author: {
          teamMemberId: '1',
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: '',
        },
        project: {
          id: '1',
          title: 'Project 1',
          status: {
            status: 'DRAFT',
            name: 'Draft',
            description: 'Draft project'
          },
        },
        replies: [
          {
            id: '1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.',
            createdAt: new Date(),
            author: {
              teamMemberId: '1',
              userId: '1',
              firstName: 'John',
              lastName: 'Doe',
              email: '',
            },
            parentReplyId: null
          },
          {
            id: '2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.',
            createdAt: new Date(),
            author: {
              teamMemberId: '1',
              userId: '1',
              firstName: 'John',
              lastName: 'Doe',
              email: '',
            },
            parentReplyId: null
          },
        ],
        status: {
          status: 'DRAFT',
          name: 'Open',
          description: 'Open thread'
        },
        likes: [],
        dislikes: []
      }
    ]);

    
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
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {note.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {note.content}
              </Typography>
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
