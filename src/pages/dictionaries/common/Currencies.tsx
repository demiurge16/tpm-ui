import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Field } from '../../../components/grid/Field';
import { Grid } from '../../../components/grid/Grid';
import { environment } from '../../../Environment';
import { Currency } from './types/Currency';

export const Currencies = () => {

  const startPage = 0;
  const pageSize = 25;

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Code', field: 'code', resizable: true },
    { headerName: 'Name', field: 'name', resizable: true }
  ]);

  const [queryDefinitions, setQueryDefinitions] = useState([
    {
      id: 'code.value',
      name: 'Code',
      filter: true,
      sortable: true,
      type: Field.STRING
    },
    {
      id: 'name',
      name: 'Name',
      filter: true,
      sortable: true,
      type: Field.STRING
    }
  ]);

  return (
    <Box>
      <Typography variant="h4">Currency</Typography>
      <Box pb={2} />
      <Grid<Currency>
        startPage={startPage}
        pageSize={pageSize}
        url={`${environment.apiUrl}/currency`}
        queryDefinitions={queryDefinitions}
        columnDefinitions={columnDefs}
      />
    </Box>
  );
}
