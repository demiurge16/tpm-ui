import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Grid } from '../../../components/grid/Grid';
import TpmClient from '../../../client/TpmClient';
import { Currency } from '../../../client/types/dictionaries/Currency';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { Currencies } from './Currencies';

export const Index = () => {

  const startPage = 0;
  const pageSize = 25;

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Code', field: 'code', resizable: true },
    { headerName: 'Name', field: 'name', resizable: true }
  ]);

  const [filters, setFilters] = useState<FilterDefinition[]>([
    FilterDefinition.string('id.value', 'Code'),
    FilterDefinition.string('name', 'Name')
  ]);

  return (
    <Box>
      <Typography variant="h4">{Currencies.title}</Typography>
      <Typography variant="subtitle1">{Currencies.description}</Typography>
      <Box pb={2} />
      <Grid<Currency>
        startPage={startPage}
        pageSize={pageSize}
        fetch={TpmClient.getInstance().currencies().all}
        filters={filters}
        columnDefinitions={columnDefs}
      />
    </Box>
  );
}
