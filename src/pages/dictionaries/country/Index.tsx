import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Grid } from '../../../components/grid/Grid';
import { Country } from '../../../client/types/dictionaries/Country';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { Countries } from './Countries';
import { useTpmClient } from '../../../contexts/TpmClientContext';

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Code',
      field: 'code',
      resizable: true,
      suppressSizeToFit: true
    },
    { 
      headerName: 'Name',
      field: 'name',
      resizable: true,
      autoHeight: true,
      wrapText: true,
      cellRenderer: (params: any) => {
        const country = params.data as Country;
        return (
          <Box my={1}>
            <Typography variant="body1">{country.name.common} {country.flag}</Typography>
            <Typography variant="body2">{country.name.official}</Typography>
          </Box>
        );
      }
    },
    {
      headerName: 'Native Names',
      field: 'nativeNames',
      resizable: true,
      autoHeight: true,
      wrapText: true,
      cellRenderer: (params: any) => {
        const country = params.data as Country;
        return (
          <Box my={1}>
            {
              Object.entries(country.name.nativeName).map(([key, value]) => (
                <Typography variant="body2" key={key}>{key}: {value.common}</Typography>
              ))
            }
          </Box>
        );
      }
    },
    {
      headerName: 'Currencies',
      field: 'currencies',
      resizable: true,
      autoHeight: true,
      wrapText: true,
      cellRenderer: (params: any) => {
        const country = params.data as Country;
        return (
          <Box my={1}>
            {
              Object.entries(country.currencies).map(([key, value]) => (
                <Typography variant="body2" key={key}>{key}: {value.name}</Typography>
              ))
            }
          </Box>
        );
      }
    },
    {
      headerName: 'Languages',
      field: 'languages',
      resizable: true,
      autoHeight: true,
      wrapText: true,
      cellRenderer: (params: any) => {
        const country = params.data as Country;
        return (
          <Box my={1}>
            {
              country.languages.map((language) => (
                <Typography variant="body2" key={language.code}>{language.code}: {language.name}</Typography>
              ))
            }
          </Box>
        );
      }
    }
  ]);

  const [filters, setFilters] = useState<FilterDefinition[]>([
    FilterDefinition.string('id.value', 'Code'),
    FilterDefinition.string('name', 'Name')
  ]);

  const tpmClient = useTpmClient();

  return (
    <Box>
      <Typography variant="h4">{Countries.title}</Typography>
      <Typography variant="subtitle1">{Countries.description}</Typography>
      <Box pb={2} />
      <Grid<Country>
        startPage={startPage}
        pageSize={pageSize}
        fetch={tpmClient.countries().all}
        export={tpmClient.countries().export}
        filters={filters}
        columnDefinitions={columnDefs}
        elevation={2}
      />
    </Box>
  );
}


