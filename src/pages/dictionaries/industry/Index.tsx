import { Box, Typography } from "@mui/material";
import { Industries } from "./Industries";

export const Index = () => {
  return (
    <Box>
      <Typography variant="h4">{Industries.title}</Typography>
      <Typography variant="subtitle1">{Industries.description}</Typography>
    </Box>
  );
};
