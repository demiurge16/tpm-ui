import "./App.scss";
import { useContext, useState } from "react";
import {
  Route,
  Link as RouterLink,
  Navigate,
  Routes,
} from "react-router-dom";
import {
  Container,
  CssBaseline,
  Typography,
  Box,
  IconButton,
  Breadcrumbs,
  Link,
  AppBar,
  Toolbar,
  useTheme,
} from "@mui/material";
import { Units } from "./pages/dictionaries/unit/Units";
import { Priorities } from "./pages/dictionaries/priority/Priorities";
import { Industries } from "./pages/dictionaries/industry/Industries";
import { ExpenseCategories } from "./pages/dictionaries/expense-category/ExpenseCategories";
import { Accuracies } from "./pages/dictionaries/accuracy/Accuracies";
import { ClientTypes } from "./pages/dictionaries/client-type/ClientTypes";
import { Currencies } from "./pages/dictionaries/currency/Currencies";
import { Countries } from "./pages/dictionaries/country/Countries";
import { Languages } from "./pages/dictionaries/language/Languages";
import { Clients } from "./pages/clients/Clients";
import { Projects } from "./pages/projects/Projects";
import { Tasks } from "./pages/tasks/Tasks";
import { Expenses } from "./pages/expenses/Expenses";
import { Threads } from "./pages/threads/Threads";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Account } from "./pages/account/Account";
import { Users } from "./pages/users/Users";
import { SecuredRoute } from "./components/routing/PrivateRoute";
import MenuIcon from "@mui/icons-material/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { SettingsMenu } from "./layout/SettingsMenu";
import { Search } from "./layout/Search";
import { Notifications } from "./layout/Notifications";
import { Messages } from "./layout/Messages";
import { LanguageSwitcher } from "./layout/LanguageSwitcher";
import { ThemeSwitcher } from "./layout/ThemeSwitcher";
import { NavigationDrawer } from "./layout/NavigationDrawer";
import { Errors } from "./pages/errors/Errors";
import { BreadcrumbsContext } from "./contexts/BreadcrumbsContext";
import { environment } from "./Environment";

function App() {
  const title = "Translation Project Manager";

  type RouteConfig = {
    path: string;
    element: JSX.Element;
  };

  const routerConfig: RouteConfig[] = [
    { path: "/", element: <Navigate to="/dashboard" /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/projects", element: <Projects.Index /> },
    { path: "/projects/create", element: <Projects.Create /> },
    { path: "/projects/:id/edit", element: <Projects.Edit /> },
    { path: "/projects/:id", element: <Projects.Details /> },
    { path: "/tasks", element: <Tasks.Index /> },
    { path: "/projects/:projectId/tasks/create", element: <Tasks.Create /> },
    { path: "/tasks/:id/edit", element: <Tasks.Edit /> },
    { path: "/tasks/:id", element: <Tasks.Details /> },
    { path: "/expenses", element: <Expenses.Index /> },
    { path: "/projects/:projectId/expenses/create", element: <Expenses.Create /> },
    { path: "/expenses/:id/edit", element: <Expenses.Edit /> },
    { path: "/expenses/:id", element: <Expenses.Details /> },
    { path: "/threads", element: <Threads.Index /> },
    { path: "/threads/create", element: <Threads.Create /> },
    { path: "/threads/:id/edit", element: <Threads.Edit /> },
    { path: "/threads/:id", element: <Threads.Details /> },
    { path: "/clients", element: <Clients.Index /> },
    { path: "/clients/create", element: <Clients.Create /> },
    { path: "/clients/:id/edit", element: <Clients.Edit /> },
    { path: "/clients/:id", element: <Clients.Details /> },
    { path: "/languages", element: <Languages.Index /> },
    { path: "/languages/:id", element: <Languages.Details /> },
    { path: "/countries", element: <Countries.Index /> },
    { path: "/countries/:id", element: <Countries.Details /> },
    { path: "/currencies", element: <Currencies.Index /> },
    { path: "/currencies/:id", element: <Currencies.Details /> },
    { path: "/accuracies", element: <Accuracies.Index /> },
    { path: "/accuracies/create", element: <Accuracies.Create /> },
    { path: "/accuracies/:id/edit", element: <Accuracies.Edit /> },
    { path: "/accuracies/:id", element: <Accuracies.Details /> },
    { path: "/expense-categories", element: <ExpenseCategories.Index /> },
    {
      path: "/expense-categories/create",
      element: <ExpenseCategories.Create />,
    },
    {
      path: "/expense-categories/:id/edit",
      element: <ExpenseCategories.Edit />,
    },
    { path: "/expense-categories/:id", element: <ExpenseCategories.Details /> },
    { path: "/industries", element: <Industries.Index /> },
    { path: "/industries/create", element: <Industries.Create /> },
    { path: "/industries/:id/edit", element: <Industries.Edit /> },
    { path: "/industries/:id", element: <Industries.Details /> },
    { path: "/priorities", element: <Priorities.Index /> },
    { path: "/priorities/create", element: <Priorities.Create /> },
    { path: "/priorities/:id/edit", element: <Priorities.Edit /> },
    { path: "/priorities/:id", element: <Priorities.Details /> },
    { path: "/units", element: <Units.Index /> },
    { path: "/units/create", element: <Units.Create /> },
    { path: "/units/:id/edit", element: <Units.Edit /> },
    { path: "/units/:id", element: <Units.Details /> },
    { path: "/client-types", element: <ClientTypes.Index /> },
    { path: "/client-types/create", element: <ClientTypes.Create /> },
    { path: "/client-types/:id/edit", element: <ClientTypes.Edit /> },
    { path: "/client-types/:id", element: <ClientTypes.Details /> },
    { path: "/users", element: <Users.Index /> },
    { path: "/users/:id", element: <Users.Details /> },
    { path: "/account", element: <Account /> },
  ];

  const routesRender = (config: RouteConfig[]) =>
    config.map((item, index) => {
      return (
        <Route key={`route-${index}`}
          path={item.path}
          element={<SecuredRoute>{item.element}</SecuredRoute>}
        />
      );
    });

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const currentBreadcrumb = breadcrumbsContext.breadcrumbs;

  const [drawerOpen, setDrawerOpen] = useState(true);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerWidth = 240;
  const theme = useTheme();
  const drawerOpenAnimation = theme.transitions.create("padding-left", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  });
  const drawerCloseAnimation = theme.transitions.create("padding-left", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
              <Link underline="hover" color="text.primary"
                component={RouterLink}
                to="/dashboard"
              >
                <Typography variant="h6" component="div">
                  {title}
                </Typography>
              </Link>
              {currentBreadcrumb && (
                currentBreadcrumb.map((item, index) => {
                  return (
                    <Link
                      key={`breadcrumb-${index}`}
                      underline="hover"
                      color="inherit"
                      component={RouterLink}
                      to={item.path}
                    >
                      <Typography variant="h6" component="div" color="inherit">
                        {item.label}
                      </Typography>
                    </Link>
                  );
                })
              )}
            </Breadcrumbs>
            <Box sx={{ flexGrow: 1 }} />
            <Search></Search>
            <Notifications></Notifications>
            <Messages></Messages>
            <ThemeSwitcher></ThemeSwitcher>
            <LanguageSwitcher></LanguageSwitcher>
            <SettingsMenu></SettingsMenu>
          </Toolbar>
        </AppBar>
        <NavigationDrawer open={drawerOpen}></NavigationDrawer>
        <Box
          component="main"
          sx={{
            paddingLeft: drawerOpen ? `${drawerWidth}px` : theme.spacing(7),
            transition: drawerOpen ? drawerOpenAnimation : drawerCloseAnimation,
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
            <Routes>
              {routesRender(routerConfig)}
              <Route path="*" element={<Errors.NotFound />} />
            </Routes>
          </Container>
        </Box>
        <Box component="footer" sx={{ p: 2, mt: "auto" , mx: "auto" }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © 2022 Translation Project Manager by&nbsp;
            <Link
              href="https://nuclear-prometheus.net/"
              color="inherit"
              underline="hover"
            >
              nuclear-prometheus.net
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Version {environment.version}
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default App;
