import { useState } from 'react';
import { Field } from '../../../components/grid/Field';
import { Grid } from '../../../components/grid/Grid';
import { environment } from '../../../Environment';
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
    },
    {
      id: 'selectTest',
      name: 'Select test',
      filter: true,
      sortable: false,
      type: Field.SELECT,
      options: [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
        { value: '3', label: 'Three' }
      ]
    },
    {
      id: 'dateTest',
      name: 'Date test',
      filter: true,
      sortable: false,
      type: Field.DATE
    }
  ]);

  return (
    <div>
      <h1>Countries</h1>
      <Grid<Country>
        startPage={startPage}
        pageSize={pageSize}
        url={`${environment.apiUrl}/country`}
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
