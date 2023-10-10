import { MouseEvent, useState } from "react";
import { MenuItem } from "./MenuItem";
import { useAuth } from "../contexts/AuthContext";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import IconButton from "@mui/material/IconButton/IconButton";
import Avatar from "@mui/material/Avatar/Avatar";
import Menu from "@mui/material/Menu/Menu";
import MenuList from "@mui/material/MenuList/MenuList";
import Link from "@mui/material/Link/Link";
import { environment } from "../Environment";
import { useTranslation } from "react-i18next";

export const SettingsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { firstName, lastName, email, logout } = useAuth();
  const { t } = useTranslation("translation", { keyPrefix: "layout.settingsMenu" });

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };

  return (
    <>
      <Box mr={2}>
        <Typography variant="body1" color="inherit">
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography variant="body1" color="inherit">
          {email}
        </Typography>
      </Box>
      <Tooltip title={t('tooltip')}>
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <Avatar alt={`${firstName} ${lastName}`} />
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
          <Link href={`${environment.authServerUrl}/realms/${environment.authServerRealm}/account`}
            underline="none"
            color="inherit"
          >
            <MenuItem onClick={handleCloseMenu} label={t("items.account")}/>
          </Link>
          <MenuItem onClick={handleLogout} label={t("items.logout")} />
        </MenuList>
      </Menu>
    </>
  );
};
