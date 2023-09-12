import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../contexts/ThemeContext";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();
  const [darkTheme, setDarkTheme] = useState<boolean>(theme === "dark"); 

  const handleThemeChange = () => {
    setDarkTheme(prevDarkTheme => {
      setTheme(prevDarkTheme ? "light" : "dark");
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