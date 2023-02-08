
import { Typography as MuiTypography, MenuItem as MuiMenuItem } from '@mui/material';

export const MenuItem = (
  props: {
    label: string,
    onClick?: () => void
  }
) => {
  
  return (
    <MuiMenuItem onClick={props.onClick}>
      <MuiTypography textAlign="center">{props.label}</MuiTypography>
    </MuiMenuItem>
  );
};