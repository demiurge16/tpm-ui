import { Box, CircularProgress } from "@mui/material";

export const LoadingScreen = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
};
