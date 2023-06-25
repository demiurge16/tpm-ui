import { Box, Typography } from "@mui/material";
import { ExpenseCategories } from "./ExpenseCategories";

export const Index = () => {
  return (
    <Box>
      <Typography variant="h4">{ExpenseCategories.title}</Typography>
      <Typography variant="subtitle1">{ExpenseCategories.description}</Typography>
    </Box>
  );
};
