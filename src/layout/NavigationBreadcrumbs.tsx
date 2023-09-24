import { Link as RouterLink } from "react-router-dom";
import { Typography, Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useBreadcrumbsContext } from "../contexts/BreadcrumbsContext";

export const NavigationBreadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbsContext();

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
    >
      <Link
        underline="hover"
        color="text.primary"
        component={RouterLink}
        to="/dashboard"
      >
        <Typography variant="h6" component="div">
          {"Project Hermes"}
        </Typography>
      </Link>
      {breadcrumbs &&
        breadcrumbs.map((item, index) => {
          return (
            <Link
              key={`breadcrumb-${index}`}
              underline="hover"
              color="inherit"
              component={RouterLink}
              to={item.path}
            >
              <Typography variant="h6" component="div" color="inherit">
                {item.label}
              </Typography>
            </Link>
          );
        })}
    </Breadcrumbs>
  );
};
