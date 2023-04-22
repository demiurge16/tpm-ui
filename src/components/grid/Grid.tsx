import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";
import { GridProps } from "./GridProps";
import { QueryBuilder } from "./QueryBuilder";
import { Box, TablePagination } from "@mui/material";
import { SortChangedEvent } from "ag-grid-community";
import { PageSizeOptions } from "./PageSizeOptions";
import { Filter, Search, Sort, SortDirection } from "../../client/types/common/Search";
import { Page } from "../../client/types/common/Page";

export function Grid<Type>(props: GridProps<Type>) {
  const gridRef = useRef<AgGridReact<Type>>(null);

  const [query, setQuery] = useState<Search>({
    page: props.startPage,
    pageSize: props.pageSize,
    sort: new Array<Sort>(),
    filters: new Array<Filter>(),
  });

  const [data, setData] = useState<Page<Type>>({
    items: [],
    totalPages: 0,
    totalElements: 0,
  });

  useEffect(() => reloadData(), []);
  useEffect(() => reloadData(), [query]);

  function handleChangePage(event: unknown, newPage: number) {
    setQuery({ ...query, page: newPage });
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery({ ...query, pageSize: parseInt(event.target.value, 10) });
  }

  function handleSortChange(event: SortChangedEvent<Type>) {
    const sort: Sort[] = event.columnApi
      .getColumns()
      ?.filter((column) => !!column.getSort())
      .map((column) => {
        return { field: column.getColId(), direction: column.getSort() as SortDirection }
      }) || [];

    setQuery({ ...query, sort: sort || []});
  }

  function reloadData() {
    props
      .fetch({
        page: query.page,
        pageSize: query.pageSize,
        sort: query.sort,
        filters: query.filters,
      })
      .subscribe({
        next: (data) => {
          setData(data);
          gridRef.current?.api?.sizeColumnsToFit();
        },
      });
  }

  return (
    <div>
      <QueryBuilder
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
            rowsPerPageOptions={Object.values(PageSizeOptions)}
          />
        </Box>
      </div>
    </div>
  );
}
