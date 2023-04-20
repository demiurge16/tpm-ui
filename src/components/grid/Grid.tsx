import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Filter } from "./Filter";
import { GridProps } from "./GridProps";
import { Page } from "./Page";
import { Query } from "./Query";
import { QueryBuilder } from "./QueryBuilder";
import { SortDirection } from "./SortDirection";

export function Grid<Type>(props: GridProps<Type>) {
  const gridRef = useRef<AgGridReact<Type>>(null);

  const [query, setQuery] = useState<Query>({
    page: props.startPage,
    pageSize: props.pageSize,
    sort: "",
    direction: SortDirection.ASC,
    filters: [],
  });

  const [elements, setElements] = useState<Type[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);

  useEffect(() => reloadData(), []);
  useEffect(() => reloadData(), [query]);

  function serializeSearch(filters: Filter[]): String {
    return filters
      .map((filter) => `${filter.field}:${filter.operator}:${filter.value}`)
      .join("&");
  }

  function reloadData() {
    axios
      .get(props.url, {
        params: {
          page: query.page,
          size: query.pageSize,
          sort: query.sort,
          direction: query.direction,
          search: serializeSearch(query.filters),
        },
      })
      .then((response) => response.data)
      .then((data) => data as Page<Type>)
      .then((data) => {
        setElements(data.items);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        gridRef.current?.api?.sizeColumnsToFit();
      });
  }

  return (
    <div>
      <QueryBuilder<Type>
        url={props.url}
        queryDefinitions={props.queryDefinitions}
        onQueryChange={(query) => setQuery(query)}
      />

      <div className="ag-theme-material">
        <AgGridReact<Type>
          domLayout="autoHeight"
          ref={gridRef}
          rowData={elements}
          columnDefs={props.columnDefinitions}
          animateRows={true}
          rowSelection="multiple"
        />
        <div>
          <span>
            Page {query.page} of {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
}
