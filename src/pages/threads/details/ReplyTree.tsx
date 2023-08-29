import React, { useContext, useState } from "react";
import TpmClient from "../../../client/TpmClient";
import { Reply } from "../../../client/types/thread/Thread";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { ReplyEditor } from "./ReplyEditor";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from "../../../contexts/AuthContextProvider";
import { HtmlPanel } from "../../../components/editor/HtmlPanel";
import { formatDate } from "../../../utils/dateFormatters";

interface ReplyTreeProps {
  threadId: string;
  replies: Reply[];
}

type ReplyMap = Record<string, Reply[]>;

const transformToTree = (replies: Reply[]): ReplyMap => {
  const replyMap: ReplyMap = { root: [] };

  replies.forEach((reply) => {
    const parentReplyId = reply.parentReplyId ?? 'root';
    if (!replyMap[parentReplyId]) {
      replyMap[parentReplyId] = [];
    }
    replyMap[parentReplyId].push(reply);
  });

  return replyMap;
};

export const ReplyTree: React.FC<ReplyTreeProps> = ({ threadId, replies }) => {
  const replyMap = transformToTree(replies);
  const [openedReplyEditor, setOpenedReplyEditor] = useState<string | null>(null);
  const [openedEditEditor, setOpenedEditEditor] = useState<string | null>(null);
  const [rerenderCounter, setRerenderCounter] = useState<number>(0); // I hate this, but this is simple

  const snackbarContext = useContext(SnackbarContext);
  const authContext = useContext(AuthContext);

  const replyLiked = (reply: Reply) => reply.likes.map((e) => e.author.userId).includes(authContext.userId);
  const replyDisliked = (reply: Reply) => reply.dislikes.map((e) => e.author.userId).includes(authContext.userId);

  const handleLike = (replyId: string) =>
    TpmClient.getInstance()
      .replies()
      .withId(replyId)
      .like()
      .subscribe({
        next: (response) => {
          const reply = replies.find((e) => e.id === replyId);

          if (!reply) {
            return;
          }

          if (reply.dislikes.some((dislike) => dislike.author.userId === response.author.userId)) {
            reply.dislikes = reply.dislikes.filter((dislike) => dislike.author.userId !== response.author.userId);
          }
          if (reply.likes.some((like) => like.author.userId === response.author.userId)) {
            reply.likes = reply.likes.map((like) => like.author.userId === response.author.userId ? response : like);
            return;
          }

          reply.likes.push(response);
          setRerenderCounter(rerenderCounter + 1);
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });
  
  const handleUnlike = (replyId: string) =>
    TpmClient.getInstance()
      .replies()
      .withId(replyId)
      .unlike()
      .subscribe({
        next: (response) => {
          const reply = replies.find((e) => e.id === replyId);

          if (!reply) {
            return;
          }

          reply.likes = reply.likes.filter((like) => like.author.userId !== response.author.userId);
          setRerenderCounter(rerenderCounter + 1);
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });

  const handleDislike = (replyId: string) =>
    TpmClient.getInstance()
      .replies()
      .withId(replyId)
      .dislike()
      .subscribe({
        next: (response) => {
          const reply = replies.find((e) => e.id === replyId);

          if (!reply) {
            return;
          }

          if (reply.likes.some((like) => like.author.userId === response.author.userId)) {
            reply.likes = reply.likes.filter((like) => like.author.userId !== response.author.userId);
          }
          if (reply.dislikes.some((dislike) => dislike.author.userId === response.author.userId)) {
            reply.dislikes = reply.dislikes.map((dislike) => dislike.author.userId === response.author.userId ? response : dislike);
            return;
          }

          reply.dislikes.push(response);
          setRerenderCounter(rerenderCounter + 1);
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });
  
  const handleUndislike = (replyId: string) =>
    TpmClient.getInstance()
      .replies()
      .withId(replyId)
      .undislike()
      .subscribe({
        next: (response) => {
          const reply = replies.find((e) => e.id === replyId);

          if (!reply) {
            return;
          }

          reply.dislikes = reply.dislikes.filter((dislike) => dislike.author.userId !== response.author.userId);
          setRerenderCounter(rerenderCounter + 1);
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });

  const toggleReplyEditor = (replyId: string) => {
    if (openedReplyEditor === replyId) {
      setOpenedReplyEditor(null);
    } else {
      setOpenedEditEditor(null);
      setOpenedReplyEditor(replyId);
    }
  };

  const handleReplySubmit = (parentReplyId: string, content: string) => {
    TpmClient.getInstance()
      .threads()
      .withId(threadId)
      .replies()
      .create({
        content,
        parentReplyId: parentReplyId,
      })
      .subscribe({
        next: (response) => {
          replies.push(response);
          setRerenderCounter(rerenderCounter + 1);
          snackbarContext.showSuccess('Success', 'Reply added');
          setOpenedReplyEditor(null);
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });

    setOpenedReplyEditor(null);
  };

  const handleReplyCancel = () => {
    setOpenedReplyEditor(null);
  };

  const toggleEditEditor = (replyId: string) => {
    if (openedEditEditor === replyId) {
      setOpenedEditEditor(null);
    } else {
      setOpenedReplyEditor(null);
      setOpenedEditEditor(replyId);
    }
  };

  const handleEditSubmit = (replyId: string, content: string) => {
    TpmClient.getInstance()
      .replies()
      .withId(replyId)
      .update({
        content,
      })
      .subscribe({
        next: (response) => {
          const reply = replies.find((e) => e.id === replyId);

          if (!reply) {
            return;
          }

          reply.content = response.content;
          setRerenderCounter(rerenderCounter + 1);

          snackbarContext.showSuccess('Success', 'Reply updated');
          setOpenedEditEditor(null);
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });
  };

  const handleEditCancel = () => {
    setOpenedEditEditor(null);
  };

  const handleDelete = (replyId: string) =>
    TpmClient.getInstance()
      .replies()
      .withId(replyId)
      .delete()
      .subscribe({
        next: (response) => {
          replies = replies.filter((e) => e.id !== replyId);
          setRerenderCounter(rerenderCounter + 1);

          snackbarContext.showSuccess('Success', 'Reply deleted');
        },
        error: (error) => snackbarContext.showError(error.message, error.response.data.message)
      });

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
            subheader={formatDate(reply.createdAt)}
            sx={{ pb: 0 }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <CardContent sx={{ pt: 0 }}>
            {
              reply.deleted 
                ? <HtmlPanel html="<i>Deleted</i>" />
                : <HtmlPanel html={reply.content} />
            }
          </CardContent>
          <CardActions>
            <IconButton size="small"
              sx={{ mr: 1 }}
              color={replyLiked(reply) ? 'success' : 'default'}
              disabled={reply.deleted}
              onClick={() => replyLiked(reply) ? handleUnlike(reply.id) : handleLike(reply.id)}
            >
              <ThumbUpIcon />
            </IconButton>
            <Typography variant="body1">{reply.likes.length - reply.dislikes.length}</Typography>
            <IconButton size="small"
              color={replyDisliked(reply) ? 'error' : 'default'}
              disabled={reply.deleted}
              onClick={() => replyDisliked(reply) ? handleUndislike(reply.id) : handleDislike(reply.id)}
            >
              <ThumbDownIcon />
            </IconButton>
            <IconButton size="small"
              color={openedReplyEditor === reply.id ? 'primary' : 'default'}
              disabled={reply.deleted}
              onClick={() => toggleReplyEditor(reply.id)}
            >
              <ReplyIcon />
            </IconButton>
            <IconButton size="small"
              color={openedEditEditor === reply.id ? 'primary' : 'default'}
              disabled={reply.deleted}
              onClick={() => toggleEditEditor(reply.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton size="small" disabled={reply.deleted} onClick={() => handleDelete(reply.id)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
          {openedReplyEditor === reply.id && <ReplyEditor onSend={(content) => handleReplySubmit(reply.id, content)} onCancel={handleReplyCancel}/>}
          {openedEditEditor === reply.id && <ReplyEditor initialContent={reply.content} onSend={(content) => handleEditSubmit(reply.id, content)} onCancel={handleEditCancel}/>}
          {renderReplies(reply.id)}
        </AccordionDetails>
      </Accordion>
    ));
  };

  return (
    <>
      {
        replies.length === 0
          ? <Typography variant="body1">No replies yet.</Typography>
          : renderReplies('root')
      }
    </>
  );
};