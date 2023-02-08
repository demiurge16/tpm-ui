import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { GridProps } from './GridProps';
import { Page } from './Page';
import { Query } from './Query';
import { QueryBuilder } from './QueryBuilder';
import { SortDirection } from './SortDirection';

export function Grid<Type>(props: GridProps<Type>) {
  const gridRef = useRef<AgGridReact<Type>>(null);

  const [elements, setElements] = useState<Type[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);


  useEffect(() => {
    fetch({
      page: props.startPage,
      pageSize: props.pageSize,
      sort: '',
      direction: SortDirection.ASC,
      filters: []
    }).then((data) => {
      console.log(data);
      setElements(data.items);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      gridRef.current?.api?.sizeColumnsToFit();
    });
  }, []);

  function fetch(query: Query): Promise<Page<Type>> {
    return axios.get(props.url, {
        params: {
          page: query.page,
          size: query.pageSize,
          sort: query.sort,
          direction: query.direction,
          search: serializeSearch(query)
        },
      })
      .then(response => response.data)
      .then((data) => data as Page<Type>);
  }
  
  function serializeSearch(query: Query): String {
    return query.filters.map((filter) => `${filter.field}:${filter.operator}:${filter.value}`).join('&');
  }  

  return (
    <div>
      <QueryBuilder<Type> 
        url={props.url}
        queryDefinitions={props.queryDefinitions}
        onQueryChange={(query) => {
          const result = fetch(query);
            
          result.then((response) => {
            setElements(response.items);
            setTotalPages(response.totalPages);
            setTotalElements(response.totalElements);
          });
        }}
      />

      <div className="ag-theme-alpine">
       <AgGridReact<Type> domLayout='autoHeight'
          ref={gridRef}
          rowData={elements}
          columnDefs={props.columnDefinitions}
          animateRows={true}
          rowSelection='multiple'/>
     </div>
    </div>
  );
}

