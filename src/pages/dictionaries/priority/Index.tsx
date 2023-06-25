import { Box, Typography } from "@mui/material";
import { Priorities } from "./Priorities";

export const Index = () => {
  return (
    <Box>
      <Typography variant="h4">{Priorities.title}</Typography>
      <Typography variant="subtitle1">{Priorities.description}</Typography>
    </Box>
  );
};
