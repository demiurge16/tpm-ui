import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();
  const { t } = useTranslation("translation", { keyPrefix: "layout.themeSwitcher" });
  const [darkTheme, setDarkTheme] = useState<boolean>(theme === "dark"); 

  const handleThemeChange = () => {
    setDarkTheme(prevDarkTheme => {
      setTheme(prevDarkTheme ? "light" : "dark");
      return !prevDarkTheme;
    });
  };

  return (
    <Tooltip title={t('tooltip')}>
      <IconButton onClick={handleThemeChange}>
        {darkTheme ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};