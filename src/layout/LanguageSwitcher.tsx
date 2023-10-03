import { useState } from "react";
import { css } from "@emotion/css";
import { Language } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import IconButton from "@mui/material/IconButton/IconButton";
import Menu from "@mui/material/Menu/Menu";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const styles = {
    langaugeSwitchContainer: css`
      position: relative;
      display: inline-block;
    `,
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState("en");

  const languages = [
    {
      code: "en",
      name: "English",
    },
    {
      code: "fr",
      name: "Français",
    },
    {
      code: "nl",
      name: "Nederlands",
    },
    {
      code: "de",
      name: "Deutsch",
    },
    {
      code: "es",
      name: "Español",
    },
    {
      code: "pt",
      name: "Português",
    },
    {
      code: "it",
      name: "Italiano",
    },
    {
      code: "pl",
      name: "Polski",
    },
    {
      code: "ua",
      name: "Українська",
    },
    {
      code: "hr",
      name: "Hrvatski",
    },
    {
      code: "jp",
      name: "日本語",
    }
  ];

  const { i18n } = useTranslation();

  const handleOpenLanguageMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setLanguage(language);
    setAnchorEl(null);
  };

  return (
    <div className={styles.langaugeSwitchContainer}>
      <Tooltip title="Change language">
        <IconButton onClick={handleOpenLanguageMenu}>
          <Language />
        </IconButton>
      </Tooltip>
      <Menu id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseLanguageMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {languages.map((language) => (
          <MenuItem key={language.code} onClick={() => handleLanguageChange(language.code)}>
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};