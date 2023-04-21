import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Field } from '../../../components/grid/Field';
import { Grid } from '../../../components/grid/Grid';
import { environment } from '../../../Environment';
import { Country } from './types/Country';

export const Index = () => {

  const startPage = 0;
  const pageSize = 25;

  const currenciesCellRenderer = (params: any) => Object.values(params.value).join(', ');
  const languagesCellRenderer = (params: any) => Object.values(params.value).join(', ');

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Code', field: 'code', resizable: true },
    { headerName: 'Name', field: 'name', resizable: true },
    { headerName: 'Native Names', field: 'nativeNames', resizable: true },
    { headerName: 'Currencies', field: 'currencies', resizable: true, cellRenderer: currenciesCellRenderer },
    { headerName: 'Languages', field: 'languages', resizable: true, cellRenderer: languagesCellRenderer },
    { headerName: 'Emoji', resizable: true, field: 'emoji' }
  ]);

  const [queryDefinitions, setQueryDefinitions] = useState([
    {
      id: 'id.value',
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
      <Typography variant="h4">Countries</Typography>
      <Box pb={2} />
      <Grid<Country>
        startPage={startPage}
        pageSize={pageSize}
        url={`${environment.apiUrl}/country`}
        queryDefinitions={queryDefinitions}
        columnDefinitions={columnDefs}
      />
    </Box>
  );
}


