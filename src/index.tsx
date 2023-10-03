import "./index.scss";
import "./localization";
import { StrictMode, useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { ThemeProvider, createTheme } from "@mui/material";
import AuthContextProvider from "./contexts/AuthContext";
import BreadcrumbsContextProvider from "./contexts/BreadcrumbsContext";
import ThemeContextProvider, { useThemeContext } from "./contexts/ThemeContext";
import SnackbarContextProvider from "./contexts/SnackbarContext";
import TpmClientContextProvider from "./contexts/TpmClientContext";
import { CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: '#171720',
      paper: '#1c1d27',
    },
    primary: {
      main: '#00c78c',
    },
    secondary: {
      main: '#c218ac',
    },
    text: {
      primary: '#ffe7ff'
    }
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica Neue", "Arial", "Noto Color Emoji", "sans-serif"`,
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: '#f0e6fb',
      paper: '#fbeaff',
    },
    primary: {
      main: '#0f7971',
    },
    secondary: {
      main: '#f51700',
    },
    text: { 
      primary: 'rgba(30,30,111,0.87)',
    }
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica Neue", "Arial", "Noto Color Emoji", "sans-serif"`,
  },
});

const Root = () => {
  const { theme } = useThemeContext();
  const currentTheme = useMemo(() => theme === "dark" ? darkTheme : lightTheme, [theme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthContextProvider>
          <TpmClientContextProvider>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <BreadcrumbsContextProvider>
                <SnackbarContextProvider>
                  <StrictMode>
                    <App />
                  </StrictMode>
                </SnackbarContextProvider>
              </BreadcrumbsContextProvider>
            </LocalizationProvider>
          </TpmClientContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeContextProvider>
    <Root />
  </ThemeContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
