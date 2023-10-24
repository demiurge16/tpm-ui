import { useEffect } from "react";
import { useBreadcrumbsContext } from "../../contexts/BreadcrumbsContext";
import { Box, Paper, Typography } from "@mui/material";

export const Dashboard = () => {
  const { setBreadcrumbs } = useBreadcrumbsContext();

  useEffect(() => {
    setBreadcrumbs([]);
  }, [setBreadcrumbs]);

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box flex={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Typography variant="h4">Project Hermes</Typography>
        <Typography variant="body1">Welcome to Project Hermes.</Typography>
        <Typography variant="body1">Start working by selecting a tab from the navigation bar.</Typography>
      </Box>
    </Paper>
  );
}
