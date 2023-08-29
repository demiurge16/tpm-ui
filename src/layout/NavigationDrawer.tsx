import React, { useState, useEffect, useContext } from "react";
import { Languages } from "../pages/dictionaries/language/Languages";
import { Countries } from "../pages/dictionaries/country/Countries";
import { Currencies } from "../pages/dictionaries/currency/Currencies";
import { Accuracies } from "../pages/dictionaries/accuracy/Accuracies";
import { ExpenseCategories } from "../pages/dictionaries/expense-category/ExpenseCategories";
import { Industries } from "../pages/dictionaries/industry/Industries";
import { Projects } from "../pages/projects/Projects";
import { Tasks } from "../pages/tasks/Tasks";
import { Expenses } from "../pages/expenses/Expenses";
import { Threads } from "../pages/threads/Threads";
import { Clients } from "../pages/clients/Clients";
import { Priorities } from "../pages/dictionaries/priority/Priorities";
import { Units } from "../pages/dictionaries/unit/Units";
import { ClientTypes } from "../pages/dictionaries/client-type/ClientTypes";
import { Users } from "../pages/users/Users";
import ChecklistIcon from "@mui/icons-material/Checklist";
import TaskIcon from "@mui/icons-material/Task";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import WorkIcon from "@mui/icons-material/Work";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import TranslateIcon from "@mui/icons-material/Translate";
import PublicIcon from "@mui/icons-material/Public";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ConstructionIcon from "@mui/icons-material/Construction";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import PercentIcon from "@mui/icons-material/Percent";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { css } from "@emotion/css";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box/Box";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Drawer from "@mui/material/Drawer/Drawer";
import List from "@mui/material/List/List";
import Link from "@mui/material/Link/Link";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Collapse, ListSubheader } from "@mui/material";
import { ServiceTypes } from "../pages/dictionaries/service-types/ServiceTypes";
import { AuthContext, Role } from "../contexts/AuthContextProvider";

export interface NavigationDrawerProps {
  open: boolean;
}

type MenuItem = {
  icon: any;
  label: string;
  path?: string;
  roles?: Role[];
  groups?: {
    label?: string;
    items: MenuItem[];
  }[];
};

export const NavigationDrawer = (props: NavigationDrawerProps) => {
  const [open, setOpen] = useState(props.open);
  useEffect(() => setOpen(props.open), [props.open]);

  const drawerWidth = 240;
  const theme = useTheme();

  const drawerOpenAnimation = theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  });
  const drawerCloseAnimation = theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });

  const styles = {
    drawerOpened: css`
      transition: ${drawerOpenAnimation};
      & .MuiDrawer-paper {
        transition: ${drawerOpenAnimation};
      }
    `,
    drawerClosed: css`
      transition: ${drawerCloseAnimation};
      & .MuiDrawer-paper {
        transition: ${drawerCloseAnimation};
      }
    `,
  };

  const menu: MenuItem[] = [
    {
      icon: ChecklistIcon,
      label: Projects.title,
      path: Projects.path,
      roles: [
        "admin",
        "project-manager",
        "translator",
        "editor",
        "proofreader",
        "subject-matter-expert",
        "publisher",
        "observer"
      ],
    },
    {
      icon: TaskIcon,
      label: Tasks.title,
      path: Tasks.path,
      roles: [
        "admin",
        "project-manager",
        "translator",
        "editor",
        "proofreader",
        "subject-matter-expert",
        "publisher",
        "observer"
      ],

    },
    {
      icon: RequestQuoteIcon,
      label: Expenses.title,
      path: Expenses.path,
      roles: [
        "admin",
        "project-manager"
      ],
    },
    {
      icon: NoteAltIcon,
      label: Threads.title,
      path: Threads.path,
      roles: [
        "admin",
        "project-manager",
        "translator",
        "editor",
        "proofreader",
        "subject-matter-expert",
        "publisher",
        "observer"
      ],
    },
    {
      icon: WorkIcon,
      label: Clients.title,
      path: Clients.path,
      roles: [
        "admin",
        "project-manager"
      ],
    },
    {
      icon: MenuBookIcon,
      label: "Dictionaries",
      groups: [
        {
          label: "Common",
          items: [
            {
              icon: TranslateIcon,
              label: Languages.title,
              path: Languages.path,
              roles: [
                "admin",
                "project-manager"
              ],
            },
            {
              icon: PublicIcon,
              label: Countries.title,
              path: Countries.path,
              roles: [
                "admin",
                "project-manager"
              ],
            },
            {
              icon: CurrencyExchangeIcon,
              label: Currencies.title,
              path: Currencies.path,
              roles: [
                "admin",
                "project-manager"
              ],
            },
          ],
        },
        {
          label: "Project",
          items: [
            {
              icon: FactCheckIcon,
              label: Accuracies.title,
              path: Accuracies.path,
              roles: [
                "admin",
                "project-manager"
              ],
            },
            {
              icon: ProductionQuantityLimitsIcon,
              label: ExpenseCategories.title,
              path: ExpenseCategories.path,
              roles: [
                "admin",
                "project-manager"
              ],
            },
            {
              icon: ConstructionIcon,
              label: Industries.title,
              path: Industries.path,
              roles: [
                "admin",
                "project-manager"
              ],
            },
            {
              icon: LowPriorityIcon,
              label: Priorities.title,
              path: Priorities.path,
              roles: [
                "admin",
                "project-manager"
              ],
            },
            {
              icon: PercentIcon,
              label: Units.title,
              path: Units.path,
              roles: [
                "admin",
                "project-manager"
              ],
            },
            {
              icon: DesignServicesIcon,
              label: ServiceTypes.title,
              path: ServiceTypes.path,
              roles: [
                "admin",
                "project-manager"
              ],
            }
          ],
        },
        {
          label: "Client",
          items: [
            {
              icon: HomeWorkIcon,
              label: ClientTypes.title,
              path: ClientTypes.path,
              roles: [
                "admin",
                "project-manager"
              ],
            },
          ],
        },
      ],
    },
    {
      icon: PersonIcon,
      label: Users.title,
      path: Users.path,
      roles: [
        "admin",
        "project-manager"
      ],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      className={open ? styles.drawerOpened : styles.drawerClosed}
      sx={{
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        overflow: "hidden",
        width: open ? drawerWidth : theme.spacing(8),
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : theme.spacing(8),
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          overflow: "hidden",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflowY: "auto" }}>
        <List>
          {menu.map((menuItem, index) =>
            menuItem.path ? (
              <NavigationDrawerItem
                open={open}
                index={index}
                icon={menuItem.icon}
                label={menuItem.label}
                path={menuItem.path}
                roles={menuItem.roles!!}
              />
            ) : (
              menuItem.groups && (
                <NavigationDrawerItemGroup
                  drawerOpen={open}
                  index={index}
                  icon={menuItem.icon}
                  label={menuItem.label}
                  groups={menuItem.groups}
                />
              )
            )
          )}
        </List>
      </Box>
    </Drawer>
  );
};

const NavigationDrawerItem = (props: {
  open: boolean;
  index: number;
  icon: React.ElementType;
  label: string;
  path: string;
  roles: Role[];
}) => {
  const [open, setOpen] = useState(props.open);
  const { index, icon, label, path, roles } = props;
  const location = useLocation();
  const authContext = useContext(AuthContext);

  useEffect(() => setOpen(props.open), [props.open]);

  return roles.some(authContext.hasRole) ? (
    <Link
      key={index}
      component={RouterLink}
      to={path}
      underline="none"
      color="inherit"
    >
      <ListItem key={index} disablePadding>
        <ListItemButton
          sx={{
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
  ) : (
    <></>
  );
};

const NavigationDrawerItemGroup = (props: {
  drawerOpen: boolean;
  index: number;
  label: string;
  icon: React.ElementType;
  groups: {
    label?: string;
    items: MenuItem[];
  }[];
}) => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(props.drawerOpen);
  const { index, label, groups } = props;

  useEffect(() => setDrawerOpen(props.drawerOpen), [props.drawerOpen]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: drawerOpen ? "initial" : "center",
            px: 2.5,
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
      <Collapse key={index} in={open} timeout="auto" unmountOnExit>
        <List>
          {groups.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {
                group.label && (
                  <ListSubheader
                    sx={{
                      display: drawerOpen ? "initial" : "none",
                    }}
                  >
                    {group.label}
                  </ListSubheader>
                )
              }
              {
                group.items.map(
                  (item, index) =>
                    (item.path && (
                      <NavigationDrawerItem
                        open={drawerOpen}
                        index={index}
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                        roles={item.roles!!}
                      />
                    )) || (
                      <NavigationDrawerItemGroup
                        drawerOpen={drawerOpen}
                        index={index}
                        icon={item.icon}
                        label={item.label}
                        groups={item.groups!!}
                      />
                    )
                )
              }
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};
