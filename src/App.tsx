import './App.scss';
import { Routes, Route, Link as RouterLink, useLocation, Navigate } from 'react-router-dom';
import { MenuConfig } from './menu/MenuConfig';
import { AppBar, Container, CssBaseline, Toolbar, Typography, Box, Link, Breadcrumbs, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Navbar } from './menu/Navbar';
import { SettingsMenu } from './menu/SettingsMenu';
import { Logo } from './menu/Logo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Projects, Clients, Languages, Countries, Currencies, ClientTypes, Dashboard, Account, CreateClientType, EditClientType } from './pages/Pages';

function App() {
  const title = "Translation Project Manager";

  const breadcrumb = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Projects", path: "/projects" },
    { name: "Tasks", path: "/tasks" },
    { name: "Invites", path: "/invites" },
    { name: "Additional Costs", path: "/additional-costs" },
    { name: "Clients", path: "/clients" },
    { name: "Languages", path: "/languages" },
    { name: "Countries", path: "/countries" },
    { name: "Currencies", path: "/currencies" },
    { name: "Client types", path: "/client-types" },
    { name: "Account", path: "/account" },
  ];

  const menu = new MenuConfig(
    [
      {
        label: "Projects",
        path: "/projects",
        element: <Projects />
      },
      {
        label: "Clients",
        path: "/clients",
        element: <Clients />
      },
      {
        label: "Dictionaries",
        groups: {
          common: [
            { label: "Languages", path: "/languages", element: <Languages /> },
            { label: "Countries", path: "/countries", element: <Countries /> },
            { label: "Currencies", path: "/currencies", element: <Currencies /> },
          ],
          client: [
            {
              label: "Client types",
              path: "/client-types",
              element: <ClientTypes />,
              subroutes: [
                { 
                  label: "Create client type",
                  path: "create",
                  element: <CreateClientType />
                },
              ]
            },
          ]
        }
      }
    ]
  );

  type RouteConfig = {
    path: string;
    element?: JSX.Element;
    children?: RouteConfig[];
  };

  const routerConfig: RouteConfig[] = [
    { path: "/", element: <Navigate to="/dashboard" /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/projects", element: <Projects /> },
    { path: "/clients", element: <Clients /> },
    { path: "/languages", element: <Languages /> },
    { path: "/countries", element: <Countries /> },
    { path: "/currencies", element: <Currencies /> },
    { path: "/client-types", element: <ClientTypes /> },
    { path: "/client-types/create", element: <CreateClientType /> },
    { path: "/client-types/edit/:id", element: <EditClientType /> },
    { path: "/account", element: <Account /> },
  ];

  const routesRender = (config: RouteConfig[]) => 
    config.map((item) => {
      if (item.children) {
        return (
          <Route path={item.path} element={item.element}>
            {routesRender(item.children)}
          </Route>
        );
      }

      return <Route path={item.path} element={item.element} />;
    });


  const location = useLocation();

  const currentBreadcrumb = breadcrumb.find(x => x.path === location.pathname);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <AppBar position="sticky">
            <Container maxWidth={false}>
              <Toolbar>
                <Logo title={title}></Logo>
                <Navbar elements={menu.elements}></Navbar>
                <Box sx={{ flexGrow: 1 }} />
                <SettingsMenu></SettingsMenu>
              </Toolbar>
            </Container>
            <Divider />
            <Container maxWidth={false}>
              {currentBreadcrumb && (
                <Container maxWidth={false}>
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard">
                      Home
                    </Link>
                    <Typography color="text.primary">{currentBreadcrumb.name}</Typography>
                  </Breadcrumbs>
                </Container>
              )
              }
            </Container>
          </AppBar>
          <main role='main'>
            <Container maxWidth={false}>
              <Box sx={{ pt: 4 }}>
                <Routes>
                  {routesRender(routerConfig)}
                </Routes>
              </Box>
            </Container>
          </main>
          <footer>
            <Container maxWidth={false}>
              <Toolbar>
                <Typography variant="body1" color="inherit">
                  © 2022 Translation Project Manager by&nbsp;
                  <Link href="https://nuclear-prometheus.net/" color="inherit" underline="hover">
                    nuclear-prometheus.net
                  </Link>
                </Typography>
              </Toolbar>
            </Container>
          </footer>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
