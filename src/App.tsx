import { useState } from "react";
import {
  Container,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SettingsMenu } from "./layout/SettingsMenu";
import { LanguageSwitcher } from "./layout/LanguageSwitcher";
import { ThemeSwitcher } from "./layout/ThemeSwitcher";
import { NavigationDrawer } from "./layout/NavigationDrawer";
import { RouterConfig } from "./layout/RouterConfig";
import { NavigationBreadcrumbs } from "./layout/NavigationBreadcrumbs";
import { Footer } from "./layout/Footer";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerWidth = 280;
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
            <NavigationBreadcrumbs />
            <Box sx={{ flexGrow: 1 }} />
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
            <RouterConfig />
          </Container>
        </Box>
        <Box
          component="footer"
          sx={{
            p: 2,
            mt: "auto",
            mx: "auto",
            paddingLeft: drawerOpen ? `${drawerWidth}px` : theme.spacing(7),
            transition: drawerOpen ? drawerOpenAnimation : drawerCloseAnimation,
          }}
        >
          <Footer />
        </Box>
      </Container>
    </>
  );
}

export default App;
