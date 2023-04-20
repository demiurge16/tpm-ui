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
import { Units } from './pages/dictionaries/unit/Units';
import { Priorities } from './pages/dictionaries/priority/Priorities';
import { Industries } from './pages/dictionaries/industry/Industries';
import { ExpenseCategories } from './pages/dictionaries/expense-category/ExpenseCategories';
import { Accuracies } from './pages/dictionaries/accuracy/Accuracies';
import { ClientTypes } from './pages/dictionaries/client-type/ClientTypes';
import { Currencies } from './pages/dictionaries/currency/Currencies';
import { Countries } from './pages/dictionaries/country/Countries';
import { Languages } from './pages/dictionaries/language/Languages';
import { Clients } from './pages/clients/Clients';
import { Projects } from './pages/projects/Projects';
import { Tasks } from './pages/tasks/Tasks';
import { Expenses } from './pages/expenses/Expenses';
import { Chats } from './pages/chats/Tasks';
import { Notes } from './pages/notes/Tasks';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Account } from './pages/account/Account';
import { Users } from './pages/users/Users';

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
      { label: Projects.title, path: Projects.path, element: <Projects.Index /> },
      { label: Tasks.title, path: Tasks.path, element: <Tasks.Index /> },
      { label: Tasks.title, path: Tasks.path, element: <Expenses.Index /> },
      { label: Chats.title, path: Chats.path, element: <Chats.Index /> },
      { label: Notes.title, path: Notes.path, element: <Notes.Index /> },
      { label: Clients.title, path: Clients.path, element: <Clients.Index /> },
      {
        label: "Dictionaries",
        groups: {
          common: [
            { label: Languages.title, path: Languages.path, element: <Languages.Index /> },
            { label: Countries.title, path: Countries.path, element: <Countries.Index /> },
            { label: Currencies.title, path: Currencies.path, element: <Currencies.Index /> },
          ],
          project: [
            { label: Accuracies.title, path: Accuracies.path, element: <Accuracies.Index /> },
            { label: ExpenseCategories.title, path: ExpenseCategories.path, element: <ExpenseCategories.Index /> },
            { label: Industries.title, path: Industries.path, element: <Industries.Index /> },
            { label: Priorities.title, path: Priorities.path, element: <Priorities.Index /> },
            { label: Units.title, path: Units.path, element: <Units.Index /> },
          ],
          client: [
            { label: ClientTypes.title, path: ClientTypes.path, element: <ClientTypes.Index /> },
          ]
        }
      },
      { label: Users.title, path: Users.path, element: <Users.Index /> }
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
    { path: "/projects", element: <Projects.Index /> },
    { path: "/projects/create", element: <Projects.Create /> },
    { path: "/projects/:id/edit", element: <Projects.Edit /> },
    { path: "/projects/:id", element: <Projects.Details /> },
    { path: "/tasks", element: <Tasks.Index /> },
    { path: "/tasks/create", element: <Tasks.Create /> },
    { path: "/tasks/:id/edit", element: <Tasks.Edit /> },
    { path: "/tasks/:id", element: <Tasks.Details /> },
    { path: "/expenses", element: <Expenses.Index /> },
    { path: "/expenses/create", element: <Expenses.Create /> },
    { path: "/expenses/:id/edit", element: <Expenses.Edit /> },
    { path: "/expenses/:id", element: <Expenses.Details /> },
    { path: "/chats", element: <Chats.Index /> },
    { path: "/chats/create", element: <Chats.Create /> },
    { path: "/chats/:id/edit", element: <Chats.Edit /> },
    { path: "/chats/:id", element: <Chats.Details /> },
    { path: "/notes", element: <Notes.Index /> },
    { path: "/notes/create", element: <Notes.Create /> },
    { path: "/notes/:id/edit", element: <Notes.Edit /> },
    { path: "/notes/:id", element: <Notes.Details /> },
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
    { path: "/expense-categories/create", element: <ExpenseCategories.Create /> },
    { path: "/expense-categories/:id/edit", element: <ExpenseCategories.Edit /> },
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
