import { useState } from "react";
import {
  IconButton,
  Tooltip
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export const ThemeSwitcher = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  const handleThemeChange = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={handleThemeChange}>
        {darkTheme ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};