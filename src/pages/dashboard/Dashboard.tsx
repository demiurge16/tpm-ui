import { useContext, useEffect } from "react";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { Box, Typography } from "@mui/material";

export const Dashboard = () => {
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([]);
  }, []);

  return (
    <Box flex={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Typography variant="h4">Translation project manager</Typography>
      <Typography variant="body1">Welcome to the translation project manager.</Typography>
      <Typography variant="body1">Start working by selecting a tab from the navigation bar.</Typography>
    </Box>
  );
}
