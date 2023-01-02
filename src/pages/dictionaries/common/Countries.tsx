import { useState } from 'react';
import { Grid } from '../../../components/grid/Grid';
import { Operation } from '../../../components/grid/Operation';
import { Country } from '../../../types/Country';

export const Countries = () => {

  const startPage = 0;
  const pageSize = 25;

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
      id: 'code',
      name: 'Code',
      filter: true,
      sortable: true,
      operations: [
        Operation.EQUALS, Operation.CONTAINS, Operation.ANY
      ]
    },
    {
      id: 'name',
      name: 'Name',
      filter: true,
      sortable: true,
      operations: [
        Operation.EQUALS, Operation.CONTAINS, Operation.ANY
      ]
    },
  ]);

  return (
    <div>
      <h1>Countries</h1>
      <Grid<Country>
        startPage={startPage}
        pageSize={pageSize}
        url='http://localhost:8080/api/v1/country'
        queriesUrl='http://localhost:8080/api/v1/country/query'
        queryDefinitions={queryDefinitions}
        columnDefinitions={columnDefs}
      />
    </div>
  );
}

function currenciesCellRenderer(params: any) {
  return Object.values(params.value).join(', ');
}

function languagesCellRenderer(params: any) {
  return Object.values(params.value).join(', ');
}
