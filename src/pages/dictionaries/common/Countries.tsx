import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Country } from '../../../types/Country';

export const Countries = () => {

  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<AgGridReact<Country>>(null);

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Code', field: 'code', filter: true, resizable: true, sortable: true },
    { headerName: 'Name', field: 'name', filter: true, resizable: true, sortable: true },
    { headerName: 'Native Names', field: 'nativeNames', resizable: true },
    { headerName: 'Currencies', field: 'currencies', resizable: true, cellRenderer: currenciesCellRenderer },
    { headerName: 'Languages', field: 'languages', resizable: true, cellRenderer: languagesCellRenderer },
    { headerName: 'Emoji', resizable: true, field: 'emoji' }
  ]);

  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetchCountries(startPage, pageSize).then((data) => {
      setCountries(data);
      gridRef.current?.api?.sizeColumnsToFit();
    });
  }, []);

  return (
    <div>
      <h1>Countries</h1>
      <div className="ag-theme-alpine">
       <AgGridReact<Country> domLayout='autoHeight'
          ref={gridRef}
          rowData={countries}
          columnDefs={columnDefs}
          animateRows={true}
          pagination={true}
          paginationPageSize={pageSize}
          rowSelection='multiple'/>
     </div>
    </div>
  );
}

function currenciesCellRenderer(params: any) {
  return Object.values(params.value).join(', ');
}

function languagesCellRenderer(params: any) {
  return Object.values(params.value).join(', ');
}

function fetchCountries(page: number, pageSize: number): Promise<Country[]> {
  return axios.get('http://localhost:8080/api/v1/country')
    .then(response => response.data)
    .then((countries: Country[]) => countries);
}
