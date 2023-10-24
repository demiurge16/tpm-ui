import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Grid } from '../../../components/grid/Grid';
import { Currency } from '../../../client/types/dictionaries/Currency';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { Currencies } from './Currencies';
import { applicationClient } from '../../../client/ApplicationClient';

export const Index = () => {

  const startPage = 0;
  const pageSize = 25;

  const columnDefs = [
    { headerName: 'Code', field: 'code', resizable: true },
    { headerName: 'Name', field: 'name', resizable: true }
  ];

  const filters = [
    FilterDefinition.string('id.value', 'Code'),
    FilterDefinition.string('name', 'Name')
  ];

  return (
    <Box>
      <Typography variant="h4">{Currencies.title}</Typography>
      <Typography variant="subtitle1">{Currencies.description}</Typography>
      <Box pb={2} />
      <Grid<Currency>
        startPage={startPage}
        pageSize={pageSize}
        fetch={applicationClient.currencies().all}
        exportData={applicationClient.currencies().export}
        filters={filters}
        columnDefinitions={columnDefs}
        elevation={2}
      />
    </Box>
  );
}
