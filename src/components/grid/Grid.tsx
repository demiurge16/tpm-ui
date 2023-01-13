import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { GridProps } from './GridProps';
import { Query } from './Query';
import { QueryBuilder } from './QueryBuilder';
import { SortDirection } from './SortDirection';

export function Grid<Type>(props: GridProps<Type>) {
  const gridRef = useRef<AgGridReact<Type>>(null);

  const [data, setData] = useState<Type[]>([]);

  useEffect(() => {
    fetch({
      page: props.startPage,
      pageSize: props.pageSize,
      sort: '',
      direction: SortDirection.ASC,
      filters: []
    }).then((data) => {
      setData(data);
      gridRef.current?.api?.sizeColumnsToFit();
    });
  }, []);

  function fetch(query: Query): Promise<Type[]> {
    return axios.get(props.url, {
        params: {
          page: query.page,
          size: query.pageSize,
          sort: query.sort,
          direction: query.direction,
          search: serilaizeSearch(query)
        },
      })
      .then(response => response.data)
      .then((countries: Type[]) => countries);
  }
  

  return (
    <div>
      <QueryBuilder<Type> 
        url={props.url}
        queryDefinitions={props.queryDefinitions}
        onQueryChange={(query) => {
          const result = fetch(query);
            
          result.then((response) => {
            setData(response);
          });
        }}
      />

      <div className="ag-theme-alpine">
       <AgGridReact<Type> domLayout='autoHeight'
          ref={gridRef}
          rowData={data}
          columnDefs={props.columnDefinitions}
          animateRows={true}
          rowSelection='multiple'/>
     </div>
    </div>
  );
}

function serilaizeSearch(query: Query): String {
  return query.filters.map((filter) => `${filter.field}:${filter.operator}:${filter.value}`).join('&');
}
