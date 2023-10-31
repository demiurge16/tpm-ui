import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box flex={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Typography variant="h4">404 Not Found</Typography>
      <Typography variant="body1">The page you are looking for does not exist.</Typography>
    </Box>
  );
};

export default NotFound;
