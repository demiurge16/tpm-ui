import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { GridProps } from './GridProps';
import { QueryBuilder } from './QueryBuilder';

export function Grid<Type>(props: GridProps<Type>) {

  const startPage = 0;
  const pageSize = 25;

  const gridRef = useRef<AgGridReact<Type>>(null);

  const [data, setData] = useState<Type[]>([]);

  useEffect(() => {
    fetch(startPage, pageSize).then((data) => {
      setData(data);
      gridRef.current?.api?.sizeColumnsToFit();
    });
  }, []);

  function fetch(page: number, pageSize: number): Promise<Type[]> {
    return axios.get(props.url)
      .then(response => response.data)
      .then((countries: Type[]) => countries);
  }
  

  return (
    <div>
      <QueryBuilder<Type> 
        url={props.url}
        queriesUrl={props.queriesUrl}
        queryDefinitions={props.queryDefinitions}
        onQueryChange={(query) => {
          console.log(query);
        }}
      />

      <div className="ag-theme-alpine">
       <AgGridReact<Type> domLayout='autoHeight'
          ref={gridRef}
          rowData={data}
          columnDefs={props.columnDefinitions}
          animateRows={true}
          pagination={true}
          paginationPageSize={pageSize}
          rowSelection='multiple'/>
     </div>
    </div>
  );
}
