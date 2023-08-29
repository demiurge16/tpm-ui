import { Box, Typography } from "@mui/material";

export const InternalServerError = () => {
  return (
    <Box flex={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Typography variant="h4">500 Internal Server Error</Typography>
      <Typography variant="body1">An error occurred while processing your request.</Typography>
    </Box>
  );
};
