import { ElementType, Fragment, useState, useEffect } from "react";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Collapse } from "@mui/material";
import { MenuConfig, isGroup, isItem } from "./MenuConfig";
import { NavigationDrawerItem } from "./NavigationDrawerItem";

export const NavigationDrawerItemGroup = (props: {
  drawerOpen: boolean;
  index: number;
  label: string;
  icon: ElementType;
  items: MenuConfig;
  nestIndex: number;
}) => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(props.drawerOpen);
  const { index, label, items, nestIndex } = props;

  useEffect(() => setDrawerOpen(props.drawerOpen), [props.drawerOpen]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <ListItem disablePadding
        sx={{ pl: nestIndex * 2.5 }}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: drawerOpen ? "initial" : "center",
            px: 2.5
          }}
          onClick={handleClick}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: drawerOpen ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {props.icon && <props.icon sx={{ mr: 1 }} />}
          </ListItemIcon>
          <ListItemText
            primary={label}
            sx={{
              display: drawerOpen ? "initial" : "none",
              whiteSpace: "nowrap",
            }}
          />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse key={index}
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <List>
          {items.map((item, index) =>
            isItem(item) ? (
              <NavigationDrawerItem
                key={index}
                open={drawerOpen}
                index={index}
                icon={item.icon}
                label={item.label}
                path={item.path}
                nestIndex={nestIndex + 1}
              />
            ) : (
              isGroup(item) && (
                <NavigationDrawerItemGroup
                  key={index}
                  drawerOpen={drawerOpen}
                  index={index}
                  icon={item.icon}
                  label={item.label}
                  items={item.items}
                  nestIndex={nestIndex + 1}
                />
              )
            )
          )}
        </List>
      </Collapse>
    </Fragment>
  );
};
