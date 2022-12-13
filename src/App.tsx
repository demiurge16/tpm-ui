import './App.scss';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import * as Pages from './pages/Pages';
import { Menu, MenuItem, MenuDropdown } from './menu/Menu';

function App() {
  const title = "Translation Project Manager";

  const breadcrumb = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Projects", path: "/projects" },
    { name: "Tasks", path: "/tasks" },
    { name: "Invites", path: "/invites" },
    { name: "Additional Costs", path: "/additional-costs" },
    { name: "Clients", path: "/clients" },
    { name: "Users", path: "/users" },
    { name: "Languages", path: "/languages" },
    { name: "Countries", path: "/countries" },
    { name: "Currencies", path: "/currencies" },
    { name: "Client types", path: "/client-types" },
    { name: "Roles", path: "/roles" },
    { name: "Claims", path: "/claims" },
    { name: "Account", path: "/account" },
  ];

  const menu = new Menu(
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
      },
      { label: "Roles", route: "/roles", component: Pages.Roles },
      { label: "Claims", route: "/claims", component: Pages.Claims },
    ]
  );

  const location = useLocation();
  const navigate = useNavigate();

  const currentBreadcrumb = breadcrumb.find(x => x.path === location.pathname);

  const menuRender = menu.elements.map((item) => {
    if ('groups' in item) {
      const { groups, label } = item as MenuDropdown;
      return (
        <NavDropdown title={label} id="menu-dropdown">
          {
            Object.keys(groups).map((key, index) => {
              const group = groups[key];
              return (
                <>
                  {
                    group.map((item) => ( <NavDropdown.Item as={Link} to={item.route}>{item.label}</NavDropdown.Item> ))
                  }
                  {
                    index < Object.keys(groups).length - 1 && <NavDropdown.Divider />
                  }
                </>
              );
            })
          }
        </NavDropdown>
      );
    } else {
      const { route, label } = item as MenuItem;
      return (
        <Nav.Link as={Link} to={route}>{label}</Nav.Link>
      );
    }
  });

  return (
    <>
      <header>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">{title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
              <Nav className="me-auto">
                { menuRender }
              </Nav>
              <Nav className="ms-auto">
                <Form className="d-flex">
                  <InputGroup>
                    <Form.Control type="search" aria-label="Search"/>
                    <Button variant="outline-success">Search</Button>
                  </InputGroup>
                </Form>
                <NavDropdown title="Welcome, User!" id="account-dropdown">
                  <NavDropdown.Item as={Link} to="/account">Account settings</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container fluid className="bg-secondary">
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
            {
              currentBreadcrumb && (
                <Breadcrumb.Item active>{currentBreadcrumb.name}</Breadcrumb.Item>
              )
            }
          </Breadcrumb>
        </Container>
        
      </header>
      <main role='main' className='flex-shrink-0'>
        <Container fluid>
          <Routes>
            <Route path="/" element={<Pages.Dashboard />} />
            {
              menu.flatten().map((item) => (
                <Route path={item.route} element={<item.component />} />
              ))
            }
            <Route path="/account" element={<Pages.Account />} />
          </Routes>
        </Container>
      </main>
      <footer className="footer bg-secondary text-white text-center mt-auto">
        <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
          <span>© 2022 Copyright:&nbsp;</span>
          <a className="text-white" href="https://nuclear-prometheus.net/">nuclear-prometheus.net</a>
        </div>
      </footer>
    </>
  );
}

export default App;
