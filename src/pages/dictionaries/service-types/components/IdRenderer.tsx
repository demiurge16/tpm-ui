import { ICellRendererParams } from "ag-grid-community";
import { ServiceType } from "../../../../client/types/dictionaries/ServiceType";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const IdRenderer = ({ data: serviceType }: ICellRendererParams<ServiceType>) => {
  return serviceType && (
    <Box>
      <Button variant="text" component={Link} to={`${serviceType.id}`}>{serviceType.id}</Button>
    </Box>
  );
};
