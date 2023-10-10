import { useState } from "react";
import { css } from "@emotion/css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import IconButton from "@mui/material/IconButton/IconButton";
import Badge from "@mui/material/Badge/Badge";
import Popover from "@mui/material/Popover/Popover";
import Container from "@mui/material/Container/Container";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction/ListItemSecondaryAction";

export const Notifications = () => {
  const styles = {
    notificationContainer: css`
      position: relative;
      display: inline-block;
    `,
    notificationBadge: css`
      position: absolute;
    `,
  };

  const [testNotifications, setTestNotifications] = useState([
    {
      id: 1,
      title: "Test notification 1",
      content: "Test notification 1 content",
      date: new Date(),
    },
    {
      id: 2,
      title: "Test notification 2",
      content: "Test notification 2 content",
      date: new Date(),
    },
    {
      id: 3,
      title: "Test notification 3",
      content:
        "Test notification 3 content with long text to test overflow of the notification content text",
      date: new Date(),
    },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenNotifications = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  const handleDeleteNotification = (id: number) => {
    setTestNotifications(
      testNotifications.filter((notification) => notification.id !== id)
    );
  };

  const handleDeleteAllNotifications = () => {
    setAnchorEl(null);
    setTestNotifications([]);
  };

  return (
    <div className={styles.notificationContainer}>
      <Tooltip title="Notifications">
        <IconButton onClick={handleOpenNotifications}>
          <Badge
            badgeContent={testNotifications.length}
            color="error"
            className={styles.notificationBadge}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseNotifications}
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
          {testNotifications.length === 0 ? (
            <Box sx={{ p: 2 }}>
              <Typography variant="body1" color="inherit">
                No notifications
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
                    Notifications
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  sx={{ p: 2 }}
                  variant="text"
                  color="error"
                  onClick={handleDeleteAllNotifications}
                >
                  Dismiss all
                </Button>
              </div>
              <List>
                {testNotifications.map((notification) => (
                  <ListItem key={notification.id} disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary={notification.title}
                        secondary={notification.content}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() =>
                            handleDeleteNotification(notification.id)
                          }
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
