import {
  Typography,
  Link,
} from "@mui/material";

import { environment } from "../Environment";

export const Footer = () => {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        © 2022 Project Hermes by&nbsp;
        <Link
          href="https://nuclear-prometheus.net/"
          color="inherit"
          underline="hover"
        >
          nuclear-prometheus.net
        </Link>
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Version {environment.version}
      </Typography>
    </>
  );
};
