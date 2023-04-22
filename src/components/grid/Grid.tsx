import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Filter } from "./Filter";
import { GridProps } from "./GridProps";
import { Page } from "./Page";
import { Query } from "./Query";
import { QueryBuilder } from "./QueryBuilder";
import { Box, TablePagination } from "@mui/material";
import { SortChangedEvent } from "ag-grid-community";

export function Grid<Type>(props: GridProps<Type>) {
  const gridRef = useRef<AgGridReact<Type>>(null);

  const [query, setQuery] = useState<Query>({
    page: props.startPage,
    pageSize: props.pageSize,
    sort: "",
    filters: [],
  });

  const [data, setData] = useState<Page<Type>>({
    items: [],
    totalPages: 0,
    totalElements: 0,
  });

  useEffect(() => reloadData(), []);
  useEffect(() => reloadData(), [query]);

  function serializeSearch(filters: Filter[]): String {
    return filters
      .map((filter) => `${filter.field}:${filter.operator}:${filter.value}`)
      .join("&");
  }

  function handleChangePage(event: unknown, newPage: number) {
    setQuery({ ...query, page: newPage });
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery({ ...query, pageSize: parseInt(event.target.value, 10) });
  }

  function handleSortChange(event: SortChangedEvent<Type>) {
    const sort = event.columnApi.getColumns()
      ?.filter((column) => !!column.getSort())
      .map((column) => `${column.getColId()}:${column.getSort()}`)
      .join("&");

    console.log(sort);
    setQuery({ ...query, sort: sort || "" });
  }

  function reloadData() {
    axios
      .get(props.url, {
        params: {
          page: query.page,
          size: query.pageSize,
          sort: query.sort,
          search: serializeSearch(query.filters),
        },
      })
      .then((response) => response.data)
      .then((data) => data as Page<Type>)
      .then((data) => {
        setData(data);
        gridRef.current?.api?.sizeColumnsToFit();
      });
  }

  return (
    <div>
      <QueryBuilder<Type>
        url={props.url}
        queryDefinitions={props.queryDefinitions}
        onQueryChange={(filters) => setQuery({ ...query, filters: filters })}
      />

      <div className="ag-theme-material">
        <AgGridReact<Type>
          domLayout="autoHeight"
          ref={gridRef}
          rowData={data.items}
          columnDefs={props.columnDefinitions}
          animateRows={true}
          rowSelection="multiple"
          multiSortKey="ctrl"
          onSortChanged={(event) => handleSortChange(event)}
        />
        <Box>
          <TablePagination
            component="div"
            count={data.totalElements}
            page={query.page}
            onPageChange={handleChangePage}
            rowsPerPage={query.pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </div>
    </div>
  );
}
