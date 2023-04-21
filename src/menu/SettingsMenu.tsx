import {
  IconButton as MuiIconButton,
  Tooltip as MuiTooltip,
  Avatar as MuiAvatar,
  Menu as MuiMenu,
  Typography,
  Box,
} from "@mui/material";
import React, { useContext } from "react";
import { MenuItem } from "./MenuItem";
import { MenuLink } from "./MenuLink";
import { Account } from "../pages/account/Account";
import { AuthContext } from "../contexts/AuthContextProvider";

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
      <MuiTooltip title="Open settings">
        <MuiIconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <MuiAvatar alt={`${authContext?.firstName} ${authContext?.lastName}`} src="/static/images/avatar/2.jpg" />
        </MuiIconButton>
      </MuiTooltip>
      <MuiMenu
        sx={{ mt: "45px" }}
        id="menu-appbar"
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
        <MenuLink
          onClick={handleCloseMenu}
          path="/account"
          label="Account"
          element={<Account />}
        />
        <MenuItem onClick={handleLogout} label="Logout" />
      </MuiMenu>
    </>
  );
};
