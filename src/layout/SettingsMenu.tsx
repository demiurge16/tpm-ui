import React, { useContext } from "react";
import { MenuItem } from "./MenuItem";
import { AuthContext } from "../contexts/AuthContextProvider";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import IconButton from "@mui/material/IconButton/IconButton";
import Avatar from "@mui/material/Avatar/Avatar";
import Menu from "@mui/material/Menu/Menu";
import MenuList from "@mui/material/MenuList/MenuList";
import Link from "@mui/material/Link/Link";
import { Link as RouterLink } from "react-router-dom";

export const SettingsMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const authContext = useContext(AuthContext);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authContext?.logout();
    setAnchorEl(null);
  };

  return (
    <>
      <Box mr={2}>
        <Typography variant="body1" color="inherit">
          {`${authContext?.firstName} ${authContext?.lastName}`}
        </Typography>
        <Typography variant="body1" color="inherit">
          {authContext?.email}
        </Typography>
      </Box>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <Avatar alt={`${authContext?.firstName} ${authContext?.lastName}`} src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu id="menu-appbar"
        sx={{ mt: "45px" }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuList autoFocusItem={Boolean(anchorEl)} id="menu-list-grow">
          <Link component={RouterLink} to="/account" underline="none" color="inherit">
            <MenuItem onClick={handleCloseMenu} label="Account"/>
          </Link>
          <MenuItem onClick={handleLogout} label="Logout" />
        </MenuList>
      </Menu>
    </>
  );
};
