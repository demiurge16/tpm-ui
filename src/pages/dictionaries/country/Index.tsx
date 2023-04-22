import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Grid } from '../../../components/grid/Grid';
import TpmClient from '../../../client/TpmClient';
import { Field } from '../../../components/grid/Field';
import { Country } from '../../../client/types/dictionaries/Country';

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
        fetch={TpmClient.getInstance().countries().all}
        queryDefinitions={queryDefinitions}
        columnDefinitions={columnDefs}
      />
    </Box>
  );
}


