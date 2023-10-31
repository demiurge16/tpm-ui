import { Box, Typography } from "@mui/material";

const Forbidden = () => {
  return (
    <Box flex={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Typography variant="h4">403 Forbidden</Typography>
      <Typography variant="body1">You are not authorized to view this page.</Typography>
    </Box>
  );
};

export default Forbidden;
