import { ElementType, useState, useEffect } from "react";
import Link from "@mui/material/Link/Link";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";

export const NavigationDrawerItem = (props: {
  open: boolean;
  index: number;
  icon: ElementType;
  label: string;
  path: string;
  nestIndex: number;
}) => {
  const [open, setOpen] = useState(props.open);
  const { index, icon, label, path, nestIndex } = props;
  const location = useLocation();

  useEffect(() => setOpen(props.open), [props.open]);

  return (
    <Tooltip title={label} placement="right">
      <Link
        key={index}
        component={RouterLink}
        to={path}
        underline="none"
        color="inherit"
      >
        <ListItem key={index}
          disablePadding
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            pl: nestIndex * 2.5,
          }}  
        >
          <ListItemButton
            sx={{
              width: "100%",
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            selected={location.pathname === path}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {icon && <props.icon sx={{ mr: 1 }} />}
            </ListItemIcon>
            <ListItemText
              primary={label}
              sx={{
                display: open ? "initial" : "none",
                whiteSpace: "nowrap",
              }}
            />
          </ListItemButton>
        </ListItem>
      </Link>
    </Tooltip>
  );
};
