import { Box, Typography } from "@mui/material";
import { Units } from "./Units";

export const Index = () => {
  return (
    <Box>
      <Typography variant="h4">{Units.title}</Typography>
      <Typography variant="subtitle1">{Units.description}</Typography>
    </Box>
  );
};
