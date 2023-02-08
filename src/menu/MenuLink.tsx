import { Link as RouterLink } from 'react-router-dom';
import { MenuItemProps } from './MenuConfig';
import { Link as MuiLink } from '@mui/material';
import { MenuItem } from './MenuItem';

export const MenuLink = (props: MenuItemProps) => {
  const { route, label, onClick } = props;

  return (
    <MuiLink component={RouterLink} to={route}>
      <MenuItem onClick={onClick} label={label}/>
    </MuiLink>
  );
};
