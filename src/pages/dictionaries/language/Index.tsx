import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Field } from '../../../components/grid/Field';
import { Grid } from '../../../components/grid/Grid';
import { QueryableColumnDefinition } from '../../../components/grid/QueryableColumnDefinition';
import { environment } from '../../../Environment';
import TpmClient from '../../../client/TpmClient';
import { Language, LanguageScope, LanguageType } from '../../../client/types/dictionaries/Language';

export const Index = () => {

  const startPage = 0;
  const pageSize = 25;

  const [columnDefs, setColumnDefs] = useState<Array<(ColDef<Language> | ColGroupDef<Language>)>>([]);
  const [queryDefinitions, setQueryDefinitions] = useState<Array<QueryableColumnDefinition>>([]);

  useEffect(() => {
    Promise.all([
      axios.get<Array<LanguageScope>>(`${environment.apiUrl}/language/refdata/scopes`),
      axios.get<Array<LanguageType>>(`${environment.apiUrl}/language/refdata/types`)
    ])
      .then(([scopesResponse, typesResponse]) => Promise.all([scopesResponse.data, typesResponse.data]))
      .then(([scopes, types]) => {
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

        setQueryDefinitions([
          {
            id: 'id.value',
            name: 'Code (ISO 639-3)',
            filter: true,
            type: Field.STRING
          },
          {
            id: 'iso6392T',
            name: 'Code (ISO 639-2/T)',
            filter: true,
            type: Field.STRING
          },
          {
            id: 'iso6392B',
            name: 'Code (ISO 639-2/B)',
            filter: true,
            type: Field.STRING
          },
          {
            id: 'iso6391',
            name: 'Code (ISO 639-1)',
            filter: true,
            type: Field.STRING
          },
          {
            id: 'name',
            name: 'Name',
            filter: true,
            type: Field.STRING
          },
          {
            id: 'scope',
            name: 'Scope',
            filter: true,
            type: Field.SELECT,
            options: scopes.map(scope => ({ value: scope.code, label: scope.name }))
          },
          {
            id: 'type',
            name: 'Type',
            filter: true,
            type: Field.SELECT,
            options: types.map(type => ({ value: type.code, label: type.name }))
          },
        ]);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h4">Languages</Typography>
      <Box pb={2} />
      <Grid<Language>
        startPage={startPage}
        pageSize={pageSize}
        fetch={TpmClient.getInstance().languages().all}
        queryDefinitions={queryDefinitions}
        columnDefinitions={columnDefs}
      />
    </Box>
  );
}
