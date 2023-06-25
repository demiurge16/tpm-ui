import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Grid } from '../../../components/grid/Grid';
import TpmClient from '../../../client/TpmClient';
import { Country } from '../../../client/types/dictionaries/Country';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { Countries } from './Countries';

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

  const [filters, setFilters] = useState<FilterDefinition[]>([
    FilterDefinition.string('id.value', 'Code'),
    FilterDefinition.string('name', 'Name')
  ]);

  return (
    <Box>
      <Typography variant="h4">{Countries.title}</Typography>
      <Typography variant="subtitle1">{Countries.description}</Typography>
      <Box pb={2} />
      <Grid<Country>
        startPage={startPage}
        pageSize={pageSize}
        fetch={TpmClient.getInstance().countries().all}
        filters={filters}
        columnDefinitions={columnDefs}
      />
    </Box>
  );
}


