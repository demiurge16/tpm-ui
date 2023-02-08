import { Link as RouterLink } from 'react-router-dom';
import { Typography, MenuItem, Link } from '@mui/material';

export const Logo = (props: { title: string }) => {
  return (
    <Link component={RouterLink} to="/dashboard">
      <MenuItem>
        <Typography variant="h6" noWrap>{props.title}</Typography>
      </MenuItem>
    </Link>
  );
};
