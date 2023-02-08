import { MenuDropdownProps } from './MenuConfig';
import {
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  Divider as MuiDivider,
  Typography as MuiTypography
} from '@mui/material';
import React from 'react';
import { MenuLink } from './MenuLink';

export const MenuDropdown = (props: MenuDropdownProps) => {
  const { groups, label } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MuiMenuItem onClick={handleOpenMenu}>
        <MuiTypography textAlign="center">{label}</MuiTypography>
      </MuiMenuItem>
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
        {
          Object.keys(groups).map((key, index) => {
            const group = groups[key];
            return [
              group.map((item) => (
                <MenuLink onClick={handleCloseMenu} label={item.label} route={item.route} component={item.component} />
              )),
              index < Object.keys(groups).length - 1 && <MuiDivider />
            ];
          })
        }
      </MuiMenu>
    </>
  );
}
