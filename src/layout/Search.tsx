import { useState } from "react";
import { css } from "@emotion/css";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase/InputBase";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import IconButton from "@mui/material/IconButton/IconButton";

export const Search = () => {
  const styles = {
    searchContainer: css`
      position: relative;
      display: inline-block;
    `,
    searchInput: css`
      width: 0px;
      transition: width 0.3s ease-in-out;
    `,
    expanded: css`
      width: 200px;
      transition: width 0.3s ease-in-out;
    `,
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandSearch = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.searchContainer}>
      <InputBase
        className={expanded ? styles.expanded : styles.searchInput}
        placeholder="Search..."
        inputProps={{ "aria-label": "search" }}
        autoFocus={expanded}
      />
      <Tooltip title="Search">
        <IconButton onClick={handleExpandSearch}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};