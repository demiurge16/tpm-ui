import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Grid } from '../../../components/grid/Grid';
import { FilterDefinition } from '../../../components/grid/FilterDefinition';
import { Language } from '../../../client/types/dictionaries/Language';
import { forkJoin } from 'rxjs';
import { ColumnDefinition } from '../../../components/grid/GridProps';
import { Languages } from './Languages';
import { useTpmClient } from '../../../contexts/TpmClientContext';
import { LoadingScreen } from '../../utils/LoadingScreen';

export const Index = () => {
  const startPage = 0;
  const pageSize = 25;

  const [columnDefs, setColumnDefs] = useState<Array<ColumnDefinition<Language>>>([]);
  const [filters, setFilters] = useState<Array<FilterDefinition>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const tpmClient = useTpmClient();

  useEffect(() => {
    forkJoin({
      scopes: tpmClient.languages().refdata().scopes(),
      types: tpmClient.languages().refdata().types()
    }).subscribe((response) => {
      const { scopes, types } = response;

      setColumnDefs([
        { headerName: 'Code (ISO 639-3)', field: 'code', resizable: true, sortable: true },
        { headerName: 'Code (ISO 639-2/T)', field: 'iso6392t', resizable: true, sortable: true },
        { headerName: 'Code (ISO 639-2/B)', field: 'iso6392b', resizable: true, sortable: true },
        { headerName: 'Code (ISO 639-1)', field: 'iso6391', resizable: true, sortable: true },
        { headerName: 'Name', field: 'name', resizable: true, sortable: true },
        {
          headerName: 'Scope',
          field: 'scope',
          resizable: true,
          valueFormatter: (params) => {
            const scope = scopes.find(scope => scope.code === params.value);
            return scope ? scope.name : '';
          }
        },
        {
          headerName: 'Type',
          field: 'type',
          resizable: true,
          valueFormatter: (params) => {
            const type = types.find(type => type.code === params.value);
            return type ? type.name : '';
          }
        },
      ]);

      setFilters([
        FilterDefinition.string('id.value', 'Code (ISO 639-3)'),
        FilterDefinition.string('iso6392t', 'Code (ISO 639-2/T)'),
        FilterDefinition.string('iso6392b', 'Code (ISO 639-2/B)'),
        FilterDefinition.string('iso6391', 'Code (ISO 639-1)'),
        FilterDefinition.string('name', 'Name'),
        FilterDefinition.select('scope', 'Scope', scopes.map(scope => ({ value: scope.code, label: scope.name }))),
        FilterDefinition.select('type', 'Type', types.map(type => ({ value: type.code, label: type.name }))),
      ]);
      setLoading(false);
    });
  }, [tpmClient]);

  return (
    <Box>
      <Typography variant="h4">{Languages.title}</Typography>
      <Typography variant="subtitle1">{Languages.description}</Typography>
      <Box pb={2} />
      {
        loading ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <LoadingScreen />
          </Paper>
        ) : (
          <>
            <Grid<Language>
              startPage={startPage}
              pageSize={pageSize}
              fetch={tpmClient.languages().all}
              exportData={tpmClient.languages().export}
              filters={filters}
              columnDefinitions={columnDefs}
              elevation={2}
            />
          </>
        )
      }
    </Box>
  );
}
