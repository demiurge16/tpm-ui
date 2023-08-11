import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, CardActions, CardContent, CardHeader, Divider, IconButton, Popover, Typography } from "@mui/material";
import { Reply, Thread, ThreadStatusCode } from "../../client/types/thread/Thread";
import { Editor } from "../../components/editor/Editor";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
import { Observable } from "rxjs";
import TpmClient from "../../client/TpmClient";

type StatusTransition = {
  [key in ThreadStatusCode]: {
    [key in ThreadStatusCode]?: () => Observable<any>
  }
};

export const Details = () => {
  const thread: Thread = {
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
      {
        id: '3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.',
        createdAt: new Date(),
        author: {
          teamMemberId: '1',
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: '',
        },
        parentReplyId: '1'
      },
      {
        id: '4',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.',
        createdAt: new Date(),
        author: {
          teamMemberId: '1',
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: '',
        },
        parentReplyId: '1'
      },
      {
        id: '5',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.',
        createdAt: new Date(),
        author: {
          teamMemberId: '1',
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: '',
        },
        parentReplyId: '4'
      },
    ],
    status: {
      status: 'DRAFT',
      name: 'Open',
      description: 'Open thread'
    },
    likes: [
      {
        id: '1',
        author: {
          teamMemberId: '1',
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: '',
        },
        createdAt: new Date(),
      },
      {
        id: '2',
        author: {
          teamMemberId: '2',
          userId: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          email: '',
        },
        createdAt: new Date(),
      },
    ],
    dislikes: [
      {
        id: '1',
        author: {
          teamMemberId: '1',
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: '',
        },
        createdAt: new Date(),
      },
    ],
  };

  const statusTransitions: StatusTransition = {
    "DRAFT": {
      "ACTIVE": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .activate(),
      "DELETED": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .delete(),
    },
    "ACTIVE": {
      "FREEZE": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .freeze(),
      "CLOSED": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .close(),
      "DELETED": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .delete(),
    },
    "FREEZE": {
      "ACTIVE": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .activate(),
      "CLOSED": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .close(),
      "DELETED": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .delete(),
    },
    "CLOSED": {
      "ACTIVE": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .activate(),
      "ARCHIVED": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .archive(),
      "DELETED": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .delete(),
    },
    "ARCHIVED": {
      "ACTIVE": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .activate(),
      "CLOSED": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .close(),
      "DELETED": () => TpmClient.getInstance()
        .threads()
        .withId(thread.id)
        .delete(),
    },
    "DELETED": {},
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState<boolean>();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleReplySubmit = (content: string) => {
    // TODO: Submit reply
    console.log(content);
    setExpanded(false);
  };

  const handleReplyCancel = () => {
    setExpanded(false);
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
      <Typography variant="body1" gutterBottom>
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
          at {thread.createdAt.toLocaleString()}
        </Box>
      </Typography>
      <Typography variant="body1" gutterBottom>{thread.content}</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Button variant="text" startIcon={<ThumbUpIcon />}>
          {thread.likes.length} {thread.likes.length === 1 ? 'Like' : 'Likes'}
        </Button>
        <Button variant="text" startIcon={<ThumbDownIcon />}>
          {thread.dislikes.length} {thread.dislikes.length === 1 ? 'Dislike' : 'Dislikes'}
        </Button>
        <Button variant="text" startIcon={<ChatBubbleOutlineIcon />} color="primary">
          {thread.replies.length} {thread.replies.length === 1 ? 'Reply' : 'Replies'}
        </Button>
        <Button variant="text"
          startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={handleExpandClick}
        >
          Reply
        </Button>
        <Button variant="text" startIcon={<MoreVertIcon />} onClick={handleOpen}>More</Button>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', p: 2 }}>
            <Typography variant="body1" gutterBottom>Change status to:</Typography>
            {Object.entries(statusTransitions[thread.status.status]).map(([status, transition]) => (
              <Button key={status} variant="text" onClick={() => transition()}>{status}</Button>
            ))}
          </Box>
        </Popover>
      </Box>
      {expanded && <ReplyEditor onSend={handleReplySubmit} onCancel={handleReplyCancel}/>}
      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" gutterBottom>Comments</Typography>
      <ReplyTree replies={thread.replies} />
    </Box>
  );
};

interface ReplyTreeProps {
  replies: Reply[];
}

const transformToTree = (replies: Reply[]): Record<string, Reply[]> => {
  const replyMap: Record<string, Reply[]> = { root: [] };

  replies.forEach((reply) => {
    const parentReplyId = reply.parentReplyId ?? 'root';
    if (!replyMap[parentReplyId]) {
      replyMap[parentReplyId] = [];
    }
    replyMap[parentReplyId].push(reply);
  });

  return replyMap;
};

const ReplyTree: React.FC<ReplyTreeProps> = ({ replies }) => {
  const replyMap = transformToTree(replies);
  const [openedReplyEditor, setOpenedReplyEditor] = useState<string | null>(null);

  const toggleReplyEditor = (replyId: string) => {
    if (openedReplyEditor === replyId) {
      setOpenedReplyEditor(null);
    } else {
      setOpenedReplyEditor(replyId);
    }
  };

  const handleReplySubmit = (content: string) => {
    // TODO: Submit reply
    console.log(content);
    setOpenedReplyEditor(null);
  };

  const handleReplyCancel = () => {
    setOpenedReplyEditor(null);
  };

  const renderReplies = (replyId: string): JSX.Element[] => {
    if (!replyMap[replyId]) {
      return [];
    }

    return replyMap[replyId].map((reply) => (
      <Accordion key={reply.id}
        defaultExpanded
        sx={{
          borderLeft: '3px solid',
          borderBottom: replyId === 'root' ? "3px solid" : 0,
          mb: replyId === 'root' ? 2 : 0,
          borderColor: 'divider',
          boxShadow: 'none',
        }}
        disableGutters
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <CardHeader
            avatar={<Avatar>{reply.author.firstName[0]}</Avatar>}
            title={`${reply.author.firstName} ${reply.author.lastName}`}
            subheader={reply.createdAt.toLocaleDateString()}
            sx={{ pb: 0 }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <CardContent sx={{ pt: 0 }}>
            <Typography variant="body1">{reply.content}</Typography>
          </CardContent>
          <CardActions>
            <IconButton size="small">
              <ThumbUpIcon />
            </IconButton>
            <IconButton size="small">
              <ThumbDownIcon />
            </IconButton>
            <IconButton size="small" onClick={() => toggleReplyEditor(reply.id)}>
              <ReplyIcon />
            </IconButton>
          </CardActions>
          {openedReplyEditor === reply.id && <ReplyEditor onSend={handleReplySubmit} onCancel={handleReplyCancel}/>}
          {renderReplies(reply.id)}
        </AccordionDetails>
      </Accordion>
    ));
  };

  return (
    <div>
      {renderReplies('root')}
    </div>
  );
};

interface ReplyEditorProps {
  onSend: (content: string) => void;
  onCancel?: () => void;
}

const ReplyEditor: React.FC<ReplyEditorProps> = (props: ReplyEditorProps) => {
  const { onSend, onCancel } = props;
  const [content, setContent] = useState<string>('');

  const handleSend = () => {
    onSend(content);
    setContent('');
  };

  const handleCancel = () => {
    setContent('');
    onCancel?.();
  };

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      py: 2
    }}>
      <Box sx={{ border: '1px solid', borderColor: 'divider', p: 2 }}>
        <Editor  onEditorChange={handleContentChange}/>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          mt: 2
        }}>
          <Button sx={{ ml: 2 }} variant="contained" color="primary" startIcon={<SendIcon />} onClick={handleSend}>Send</Button>
          <Button sx={{ ml: 2 }} variant="contained" color="secondary" startIcon={<CloseIcon />} onClick={handleCancel}>Cancel</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ReplyTree;
