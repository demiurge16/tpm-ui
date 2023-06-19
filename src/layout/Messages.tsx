import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  IconButton,
  Badge,
  Tooltip,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  Button
} from "@mui/material";
import { css } from "@emotion/css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Mail } from "@mui/icons-material";

export const Messages = () => {
  const styles = {
    messageContainer: css`
      position: relative;
      display: inline-block;
    `,
    messageBadge: css`
      position: absolute;
    `,
  };

  let [testMessages, setTestMessages] = useState([
    {
      id: 1,
      title: "Test message 1",
      content: "Test message 1 content",
      date: new Date(),
    },
    {
      id: 2,
      title: "Test message 2",
      content: "Test message 2 content",
      date: new Date(),
    },
    {
      id: 3,
      title: "Test message 3",
      content:
        "Test message 3 content with long text to test overflow of the message content text",
      date: new Date(),
    },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMessages = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMessages = () => {
    setAnchorEl(null);
  };

  const handleDeleteMessage = (id: number) => {
    setTestMessages(testMessages.filter((message) => message.id !== id));
  };

  const handleDeleteAllMessages = () => {
    setAnchorEl(null);
    setTestMessages([]);
  };

  return (
    <div className={styles.messageContainer}>
      <Tooltip title="Messages">
        <IconButton onClick={handleOpenMessages}>
          <Badge
            badgeContent={testMessages.length}
            color="error"
            className={styles.messageBadge}
          >
            <Mail />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMessages}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Container maxWidth="xs">
          {testMessages.length === 0 ? (
            <Box sx={{ p: 2 }}>
              <Typography variant="body1" color="inherit">
                No messages
              </Typography>
            </Box>
          ) : (
            <>
              <div
                className={css`
                  display: flex;
                  align-items: center;
                `}
              >
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    color="inherit"
                    sx={{ fontWeight: "bold" }}
                  >
                    Messages
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  variant="text"
                  color="error"
                  onClick={handleDeleteAllMessages}
                >
                  Dismiss all
                </Button>
              </div>
              <List>
                {testMessages.map((message) => (
                  <ListItem key={message.id} disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary={message.title}
                        secondary={message.content}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteMessage(message.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Container>
      </Popover>
    </div>
  );
};
