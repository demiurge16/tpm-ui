import { Box, Typography } from "@mui/material";
import { Accuracies } from "./Accuracies";

export const Index = () => {
  return (
    <Box>
      <Typography variant="h4">{Accuracies.title}</Typography>
      <Typography variant="subtitle1">{Accuracies.description}</Typography>
    </Box>
  );
};
