import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";
import { GridProps } from "./GridProps";
import { QueryBuilder } from "./QueryBuilder";
import { Box, Button, Chip, Popover, TablePagination, Typography } from "@mui/material";
import { SortChangedEvent } from "ag-grid-community";
import { PageSizeOptions } from "./PageSizeOptions";
import { Filter, Search, Sort, SortDirection } from "../../client/types/common/Search";
import { Page } from "../../client/types/common/Page";
import FilterListIcon from '@mui/icons-material/FilterList';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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

  const reloadData = () => {
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

  const handleQueryChange = (filters: Filter[]) => {
    setQuery({ ...query, filters: filters });
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenFilters = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilters = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="text" onClick={handleOpenFilters} sx={{ mb: 1 }}>
        <FilterListIcon sx={{ mr: 1 }} />
        <Typography variant="button">Filter</Typography>
        <NavigateNextIcon sx={{ ml: 1 }} />
      </Button>
      <Typography variant="caption" sx={{ mb: 1 }}>
        {query.filters.map((filter) => (
          <Chip
            key={filter.field}
            label={`${filter.field}:${filter.operator}:${filter.value}`}
            onDelete={() => setQuery({ ...query, filters: query.filters.filter((f) => f.field !== filter.field) })}
            sx={{ ml: 1, mb: 1 }}
          />
        ))}
      </Typography>
      <Popover sx={{ p: 2 }} 
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseFilters}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <QueryBuilder
          initialState={query.filters}
          filters={props.filters}
          onQueryChange={handleQueryChange}
        />
      </Popover>

      <div className="ag-theme-material-tpm">
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
        <Box sx={{ border: "1px solid white" }}>
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
