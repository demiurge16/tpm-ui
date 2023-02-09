import {
  IconButton as MuiIconButton,
  Tooltip as MuiTooltip,
  Avatar as MuiAvatar,
  Menu as MuiMenu
} from '@mui/material';
import React from 'react';
import * as Pages from '../pages/Pages';
import { MenuItem } from './MenuItem';
import { MenuLink } from './MenuLink';

export const SettingsMenu = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MuiTooltip title="Open settings">
        <MuiIconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <MuiAvatar alt="Oleh Shatskyi" src="/static/images/avatar/2.jpg" />
        </MuiIconButton>
      </MuiTooltip>
      <MuiMenu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuLink onClick={handleCloseMenu} route="/account" label="Account" component={Pages.Account}/>
        <MenuItem onClick={handleCloseMenu} label="Logout"/>
      </MuiMenu>
    </>
  );
}