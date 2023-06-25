import { useContext, useState } from "react";
import {
  IconButton,
  Tooltip
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ThemeContext } from "../contexts/ThemeContext";

export const ThemeSwitcher = () => {
  const themeContext = useContext(ThemeContext);
  const [darkTheme, setDarkTheme] = useState<boolean>(themeContext.theme === "dark"); 

  const handleThemeChange = () => {
    setDarkTheme(prevDarkTheme => {
      themeContext.setTheme(prevDarkTheme ? "light" : "dark");
      return !prevDarkTheme;
    });
  };

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={handleThemeChange}>
        {darkTheme ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};