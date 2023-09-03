import { useContext, useEffect, useState } from "react";
import { Box, Button, Divider, Popover, Typography } from "@mui/material";
import { Reply, Thread } from "../../client/types/thread/Thread";
import { Link, useParams } from "react-router-dom";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { AuthContext } from "../../contexts/AuthContext";
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
import { useTpmClient } from "../../contexts/TpmClientContext";

export const Details = () => {
  const snackbarContext = useContext(SnackbarContext);
  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const authContext = useContext(AuthContext);

  const { id } = useParams();

  const [thread, setThread] = useState<Thread>({
    id: '',
    title: '',
    content: '',
    author: {
      userId: '',
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [replyEditorExpanded, setReplyEditorExpanded] = useState<boolean>();
  
  const tpmClient = useTpmClient();

  const statusTransitionHandler = createStatusTransitionHandler(tpmClient, id || '');

  const threadLiked = () => thread.likes.some((like) => like.author.userId === authContext.userId);
  const threadDisliked = () => thread.dislikes.some((dislike) => dislike.author.userId === authContext.userId);

  useEffect(() => {
    if (!id) {
      return;
    }

    tpmClient.threads()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setThread(response);
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });

    tpmClient.threads()
      .withId(id)
      .replies()
      .all()
      .subscribe({
        next: (response) => {
          setReplies(response.items);
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });

    breadcrumbsContext.setBreadcrumbs([
      { label: 'Home', path: '/' },
      { label: 'Threads', path: '/threads' },
      { label: thread?.title ?? "Thread", path: `/threads/${thread?.id}` },
    ]);
  }, []);

  const handleLike = () => {
    if (!thread) {
      return;
    }

    tpmClient.threads()
      .withId(thread.id)
      .like()
      .subscribe({
        next: (response) => {
          if (thread.dislikes.some((dislike) => dislike.author.userId === response.author.userId)) {
            thread.dislikes = thread.dislikes.filter((dislike) => dislike.author.userId !== response.author.userId);
          }
          if (thread.likes.some((like) => like.author.userId === response.author.userId)) {
            thread.likes = thread.likes.map((like) => like.author.userId === response.author.userId ? response : like);
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
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });
  };

  const handleUnlike = () => {
    if (!thread) {
      return;
    }

    tpmClient.threads()
      .withId(thread.id)
      .unlike()
      .subscribe({
        next: (response) => {
          setThread({
            ...thread,
            likes: thread.likes.filter((like) => like.author.userId !== response.author.userId)
          });
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });
  };

  const handleDislike = () => {
    if (!thread) {
      return;
    }

    tpmClient.threads()
      .withId(thread.id)
      .dislike()
      .subscribe({
        next: (response) => {
          if (thread.likes.some((like) => like.author.userId === response.author.userId)) {
            thread.likes = thread.likes.filter((like) => like.author.userId !== response.author.userId);
          }

          if (thread.dislikes.some((dislike) => dislike.author.userId === response.author.userId)) {
            thread.dislikes = thread.dislikes.map((dislike) => dislike.author.userId === response.author.userId ? response : dislike);
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
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });
  };

  const handleUndislike = () => {
    if (!thread) {
      return;
    }

    tpmClient.threads()
      .withId(thread.id)
      .undislike()
      .subscribe({
        next: (response) => {
          setThread({
            ...thread,
            dislikes: thread.dislikes.filter((dislike) => dislike.author.userId !== response.author.userId)
          });
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });
  };

  const handleExpandReplyEditorClick = () => {
    setReplyEditorExpanded(!replyEditorExpanded);
  };

  const handleReplySubmit = (content: string) => {
    if (!thread) {
      return;
    }

    tpmClient.threads()
      .withId(thread.id)
      .replies()
      .create({ content, parentReplyId: null })
      .subscribe({
        next: (response) => {
          setReplies([
            ...replies,
            response
          ]);
          snackbarContext.showSuccess('Success', 'Reply added');
          setReplyEditorExpanded(false);
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
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
      <Typography variant="h4" gutterBottom>{thread.title}</Typography>
      <Typography variant="body1" gutterBottom component="div">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          In Project:
          <Button variant="text" component={Link} to={`/projects/${thread.project.id}`}>
            {thread.project.title}
          </Button>
          <Divider orientation="vertical" flexItem sx={{ mr: 1 }}/>
          By:
          <Button variant="text" component={Link} to={`/users/${thread.author.userId}`}>
            {thread.author.firstName} {thread.author.lastName}
          </Button>
          at {formatDate(thread.createdAt)}
        </Box>
      </Typography>
      <HtmlPanel html={thread.content}/>

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
                          snackbarContext.showSuccess('Success', 'Thread status changed');
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
      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" gutterBottom>
        {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
      </Typography>
      <ReplyTree threadId={thread.id} replies={replies} />
    </Box>
  );
};
