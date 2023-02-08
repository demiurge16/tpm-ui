import './App.scss';
import { Routes, Route, Link as RouterLink, useLocation, Navigate } from 'react-router-dom';
import * as Pages from './pages/Pages';
import { MenuConfig } from './menu/MenuConfig';
import { AppBar, Container, CssBaseline, Toolbar, Typography, Box, Link, Breadcrumbs, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Navbar } from './menu/Navbar';
import { SettingsMenu } from './menu/SettingsMenu';
import { Logo } from './menu/Logo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

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
      { label: "Projects", route: "/projects", component: Pages.Projects },
      { label: "Tasks", route: "/tasks", component: Pages.Tasks },
      { label: "Invites", route: "/invites", component: Pages.Invites },
      { label: "Additional costs", route: "/additional-costs", component: Pages.AdditionalCosts },
      { label: "Clients", route: "/clients", component: Pages.Clients },
      { label: "Users", route: "/users", component: Pages.Users },
      {
        label: "Dictionaries",
        groups: {
          common: [   
            { label: "Languages", route: "/languages", component: Pages.Languages },
            { label: "Countries", route: "/countries", component: Pages.Countries },
            { label: "Currencies", route: "/currencies", component: Pages.Currencies },
          ],
          client: [
            { label: "Client types", route: "/client-types", component: Pages.ClientTypes },
          ]
        }
      }
    ]
  );

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
          <header>
            <AppBar>
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
                { currentBreadcrumb && (
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
          </header>
          <main role='main'>
            <Container maxWidth={false}>
              <Box sx={{ pt: 4 }}>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Pages.Dashboard />}>
                  </Route>
                  {
                    menu.flatten().map((item) => (
                      <Route path={item.route} element={<item.component />} />
                    ))
                  }
                  <Route path="/account" element={<Pages.Account />} />
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
