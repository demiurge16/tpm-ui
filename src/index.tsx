import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AuthContextProvider from "./contexts/AuthContextProvider";
import BreadcrumbsContextProvider from "./contexts/BreadcrumbsContext";
import ThemeContextProvider, { ThemeContext } from "./contexts/ThemeContext";
import SnackbarContextProvider from "./contexts/SnackbarContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica Neue", "Arial", "Noto Color Emoji", "sans-serif"`,
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica Neue", "Arial", "Noto Color Emoji", "sans-serif"`,
  },
});

const Root = () => {
  const themeContext = React.useContext(ThemeContext);
  const theme = React.useMemo(() => {
    return themeContext.theme === "dark" ? darkTheme : lightTheme;
  }, [themeContext.theme]);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ThemeProvider theme={theme}>    
            <SnackbarContextProvider>
              <App />
            </SnackbarContextProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthContextProvider>
    <BreadcrumbsContextProvider>
      <ThemeContextProvider>
        <Root />
      </ThemeContextProvider>
    </BreadcrumbsContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
