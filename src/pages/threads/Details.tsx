import { useEffect, useState } from "react";
import { Box, Button, Divider, Paper, Popover, Typography } from "@mui/material";
import { Reply, Thread } from "../../client/types/thread/Thread";
import { Link, useParams } from "react-router-dom";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { useAuth } from "../../contexts/AuthContext";
import { createStatusTransitionHandler } from "./details/ThreadStatusTransitionsHandlers";
import { ReplyEditor } from "./details/ReplyEditor";
import { ReplyTree } from "./details/ReplyTree";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { HtmlPanel } from "../../components/editor/HtmlPanel";
import { formatDate } from "../../utils/dateFormatters";
import { LoadingScreen } from "../utils/LoadingScreen";
import { applicationClient } from "../../client/ApplicationClient";

const Details = () => {
  const { showSuccess, showError } = useSnackbarContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();
  const { userId } = useAuth();

  const { id } = useParams();

  const [thread, setThread] = useState<Thread>({
    id: '',
    title: '',
    content: '',
    author: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
    },
    createdAt: new Date(),
    project: {
      id: '',
      title: '',
      status: {
        status: 'DRAFT',
        name: '',
        description: ''
      },
    },
    status: {
      status: 'DRAFT',
      name: '',
      description: ''
    },
    likes: [],
    dislikes: [],
    tags: []
  });
  const [replies, setReplies] = useState<Reply[]>([]);

  const [loadingThread, setLoadingThread] = useState<boolean>(true);
  const [loadingReplies, setLoadingReplies] = useState<boolean>(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [replyEditorExpanded, setReplyEditorExpanded] = useState<boolean>();

  const statusTransitionHandler = createStatusTransitionHandler(applicationClient, id || '');

  const threadLiked = () => thread.likes.some((like) => like.author.id === userId);
  const threadDisliked = () => thread.dislikes.some((dislike) => dislike.author.id === userId);

  useEffect(() => {
    if (!id) {
      return;
    }

    applicationClient.threads()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setThread(response);
          setBreadcrumbs([
            { label: 'Threads', path: '/threads' },
            { label: response.title ?? "Thread", path: `/threads/${response.id}` },
          ]);
          setLoadingThread(false);
        },
        error: (error) => showError(error.message, error.response.data.message)
      });

    applicationClient.threads()
      .withId(id)
      .replies()
      .all()
      .subscribe({
        next: (response) => {
          setReplies(response.items);
          setLoadingReplies(false);
        },
        error: (error) => showError(error.message, error.response.data.message)
      });

    
  }, [id, setBreadcrumbs, showError, applicationClient]);

  const handleLike = () => {
    if (!thread) {
      return;
    }

    applicationClient.threads()
      .withId(thread.id)
      .like()
      .subscribe({
        next: (response) => {
          if (thread.dislikes.some((dislike) => dislike.author.id === response.author.id)) {
            thread.dislikes = thread.dislikes.filter((dislike) => dislike.author.id !== response.author.id);
          }
          if (thread.likes.some((like) => like.author.id === response.author.id)) {
            thread.likes = thread.likes.map((like) => like.author.id === response.author.id ? response : like);
            return;
          }

          setThread({
            ...thread,
            likes: [
              ...thread.likes,
              response
            ]
          });
        },
        error: (error) => showError(error.message, error.response.data.message)
      });
  };

  const handleUnlike = () => {
    if (!thread) {
      return;
    }

    applicationClient.threads()
      .withId(thread.id)
      .unlike()
      .subscribe({
        next: (response) => {
          setThread({
            ...thread,
            likes: thread.likes.filter((like) => like.author.id !== response.author.id)
          });
        },
        error: (error) => showError(error.message, error.response.data.message)
      });
  };

  const handleDislike = () => {
    if (!thread) {
      return;
    }

    applicationClient.threads()
      .withId(thread.id)
      .dislike()
      .subscribe({
        next: (response) => {
          if (thread.likes.some((like) => like.author.id === response.author.id)) {
            thread.likes = thread.likes.filter((like) => like.author.id !== response.author.id);
          }

          if (thread.dislikes.some((dislike) => dislike.author.id === response.author.id)) {
            thread.dislikes = thread.dislikes.map((dislike) => dislike.author.id === response.author.id ? response : dislike);
            return;
          }

          setThread({
            ...thread,
            dislikes: [
              ...thread.dislikes,
              response
            ]
          });
        },
        error: (error) => showError(error.message, error.response.data.message)
      });
  };

  const handleUndislike = () => {
    if (!thread) {
      return;
    }

    applicationClient.threads()
      .withId(thread.id)
      .undislike()
      .subscribe({
        next: (response) => {
          setThread({
            ...thread,
            dislikes: thread.dislikes.filter((dislike) => dislike.author.id !== response.author.id)
          });
        },
        error: (error) => showError(error.message, error.response.data.message)
      });
  };

  const handleExpandReplyEditorClick = () => {
    setReplyEditorExpanded(!replyEditorExpanded);
  };

  const handleReplySubmit = (content: string) => {
    if (!thread) {
      return;
    }

    applicationClient.threads()
      .withId(thread.id)
      .replies()
      .create({ content, parentReplyId: null })
      .subscribe({
        next: (response) => {
          setReplies([
            ...replies,
            response
          ]);
          showSuccess('Success', 'Reply added');
          setReplyEditorExpanded(false);
        },
        error: (error) => showError(error.message, error.response.data.message)
      });
  };

  const handleReplyCancel = () => {
    setReplyEditorExpanded(false);
  };

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {
        loadingThread ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <LoadingScreen />
          </Paper>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>{thread.title}</Typography>
            <Typography variant="body1" gutterBottom component="div">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                In Project:
                <Button variant="text" component={Link} to={`/projects/${thread.project.id}`}>
                  {thread.project.title}
                </Button>
                <Divider orientation="vertical" flexItem sx={{ mr: 1 }}/>
                By:
                <Button variant="text" component={Link} to={`/users/${thread.author.id}`}>
                  {thread.author.firstName} {thread.author.lastName}
                </Button>
                at {formatDate(thread.createdAt)}
              </Box>
            </Typography>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <HtmlPanel html={thread.content}/>
            </Paper>
            <Box pb={2} />

            <Paper elevation={2} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Button variant="text"
                  color={threadLiked() ? 'success' : 'inherit'}
                  startIcon={<ThumbUpIcon />}
                  onClick={() => threadLiked() ? handleUnlike() : handleLike()}
                >
                  {thread.likes.length} {thread.likes.length === 1 ? 'Like' : 'Likes'}
                </Button>
                <Button variant="text"
                  color={threadDisliked() ? 'error' : 'inherit'}
                  startIcon={<ThumbDownIcon />}
                  onClick={() => threadDisliked() ? handleUndislike() : handleDislike()}
                >
                  {thread.dislikes.length} {thread.dislikes.length === 1 ? 'Dislike' : 'Dislikes'}
                </Button>
                <Button variant="text"
                  color={replyEditorExpanded ? 'primary' : 'inherit'}
                  startIcon={replyEditorExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  onClick={handleExpandReplyEditorClick}
                >
                  Reply
                </Button>
                <Button variant="text"
                  startIcon={<EditIcon />}
                  component={Link}
                  to="edit"
                  color="inherit"
                >
                  Edit
                </Button>
                <Button variant="text" startIcon={<MoreVertIcon />} onClick={handleOpen} color="inherit">
                  More
                </Button>
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'flex-start', flexDirection: 'column', p: 2 }}>
                    {
                      Object.entries(statusTransitionHandler[thread.status.status]).map(([status, handler]) => (
                        <Button key={status}
                          variant="text"
                          onClick={() => {
                            handler.action()
                              .subscribe({
                                next: (response) => {
                                  setThread((thread) => {
                                    return {
                                      ...thread,
                                      status: response.status
                                    };
                                  });
                                  showSuccess('Success', 'Thread status changed');
                                }
                              });
                          }}
                        >
                          {handler.name}
                        </Button>
                      ))
                    }
                  </Box>
                </Popover>
              </Box>
              {replyEditorExpanded && <ReplyEditor onSend={handleReplySubmit} onCancel={handleReplyCancel}/>}
            </Paper>
          </>
        )
      }
      
      <Divider sx={{ my: 2 }} />

      {
        loadingReplies ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <LoadingScreen />
          </Paper>
        ) : (
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
            </Typography>
            <ReplyTree threadId={thread.id} replies={replies} />
          </Paper>
        )
      }
    </Box>
  );
};

export default Details;
