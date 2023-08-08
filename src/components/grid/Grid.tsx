import { AgGridReact } from "ag-grid-react";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ColumnDefinition, GridProps } from "./GridProps";
import { QueryBuilder } from "./QueryBuilder";
import {
  Box,
  Button,
  Chip,
  Popover,
  TablePagination,
  Typography,
  useTheme,
} from "@mui/material";
import { SortChangedEvent } from "ag-grid-community";
import { PageSizeOptions } from "./PageSizeOptions";
import {
  Filter,
  Search,
  Sort,
  SortDirection,
} from "../../client/types/common/Search";
import { Page } from "../../client/types/common/Page";
import FilterListIcon from "@mui/icons-material/FilterList";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Operation } from "./Operation";
import { useStyles } from "./Styles";
import { ColumnPicker } from "./ColumnPicker";

export const Grid = <Type,>(props: GridProps<Type>) => {
  const gridRef = useRef<AgGridReact<Type>>(null);
  const theme = useTheme();
  const styles = useStyles(theme);

  useImperativeHandle(props.innerRef, () => ({
    refresh: () => reloadData(),
  }));

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
  useEffect(() => resizeGrid(), [props.columnDefinitions]);

  function handleChangePage(event: unknown, newPage: number) {
    setQuery({ ...query, page: newPage });
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery({ ...query, pageSize: parseInt(event.target.value, 10) });
  }

  function handleSortChange(event: SortChangedEvent<Type>) {
    const sort: Sort[] =
      event.columnApi
        .getColumns()
        ?.filter((column) => !!column.getSort())
        .map((column) => {
          return {
            field: column.getColId(),
            direction: column.getSort() as SortDirection,
          };
        }) || [];

    setQuery({ ...query, sort: sort || [] });
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
          resizeGrid();
        },
      });
  };

  const resizeGrid = () => {
    gridRef.current?.api?.sizeColumnsToFit();
  };

  const handleQueryChange = (filters: Filter[]) => {
    setQuery({ ...query, filters: filters });
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenFilters = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilters = () => {
    setAnchorEl(null);
  };

  const getFilterLabel = (filter: Filter) => {
    const column =
      props.filters.find((column) => column.id === filter.field)?.name ||
      filter.field;
    const operator = Operation.getOperationsForSymbol(
      filter.operator
    ).name.toLowerCase();

    if (filter.value instanceof Array) {
      const options =
        props.filters.find((column) => column.id === filter.field)?.options ||
        [];
      const values = filter.value.map(
        (value) =>
          options.find((option) => option.value === value)?.label || value
      );
      return `${column} ${operator} [${values.join(", ")}]`;
    } else if (filter.value instanceof Date) {
      return `${column} ${operator} ${filter.value.toLocaleDateString()}`;
    } else if (typeof filter.value === "boolean") {
      return `${column} ${operator} ${filter.value ? "Yes" : "No"}`;
    } else if (typeof filter.value === "number") {
      return `${column} ${operator} ${filter.value}`;
    }

    const value = filter.value;
    return `${column} ${operator} "${value}"`;
  };

  const handleColumnsChange = (columnDefinitions: ColumnDefinition<Type>[]) => {
    gridRef.current?.api?.setColumnDefs(columnDefinitions);
    resizeGrid();
  };

  return (
    <div>
      <ColumnPicker columnDefinitions={props.columnDefinitions} onColumnDefinitionsChange={handleColumnsChange}/>
      <Button variant="text" onClick={handleOpenFilters} sx={{ mb: 1 }}>
        <FilterListIcon sx={{ mr: 1 }} />
        <Typography variant="button">Filters</Typography>
        <NavigateNextIcon sx={{ ml: 1 }} />
      </Button>
      <Typography variant="caption" sx={{ mb: 1 }}>
        {query.filters.map((filter) => (
          <Chip
            key={filter.field}
            label={getFilterLabel(filter)}
            onDelete={() =>
              setQuery({
                ...query,
                filters: query.filters.filter((f) => f.field !== filter.field),
              })
            }
            sx={{ ml: 1, mb: 1 }}
          />
        ))}
      </Typography>
      <Popover
        sx={{ p: 2 }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseFilters}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <QueryBuilder
          initialState={query.filters}
          filters={props.filters}
          onQueryChange={handleQueryChange}
        />
      </Popover>

      <div className={`ag-theme-alpine ${styles.grid}`}>
        <AgGridReact<Type>
          domLayout="autoHeight"
          ref={gridRef}
          rowData={data.items}
          columnDefs={props.columnDefinitions}
          animateRows={true}
          rowSelection="multiple"
          multiSortKey="ctrl"
          suppressDragLeaveHidesColumns={true}
          onSortChanged={(event) => handleSortChange(event)}
        />
        <Box className={styles.pagination}>
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
};
