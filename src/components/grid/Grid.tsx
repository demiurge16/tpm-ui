import { AgGridReact } from "ag-grid-react";
import React, {
  ChangeEvent,
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
  Paper,
  Popover,
  TablePagination,
  Tooltip,
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
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from '@mui/icons-material/Download';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { Operation } from "./Operation";
import { useStyles } from "./Grid.styles";
import { ColumnPicker } from "./ColumnPicker";
import { LoadingScreen } from "../../pages/utils/LoadingScreen";
import { useTranslation } from "react-i18next";
import { Label } from "../utils/Label";

export const Grid = <Type,>(
  { startPage, pageSize, columnDefinitions, filters, fetch, exportData, innerRef, elevation }: GridProps<Type>
) => {
  const gridRef = useRef<AgGridReact<Type>>(null);
  const theme = useTheme();
  const styles = useStyles(theme, elevation);
  const { t, i18n } = useTranslation("translation", { keyPrefix: "components.grid" });

  useImperativeHandle(innerRef, () => ({
    refresh: () => reloadData(query),
  }));

  const [query, setQuery] = useState<Search>({
    page: startPage,
    pageSize: pageSize,
    sort: new Array<Sort>(),
    filters: new Array<Filter>(),
  });

  const [data, setData] = useState<Page<Type>>({
    items: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });

  useEffect(() => reloadData(query), []);
  useEffect(() => resizeGrid(), [columnDefinitions]);

  // This is a hack to force the grid to redraw when the language changes
  const [redraw, setRedraw] = useState(false);
  useEffect(() => {
    setRedraw(true);
    setTimeout(() => setRedraw(false), 0);
  }, [i18n.language]);

  function handleChangePage(event: unknown, newPage: number) {
    setQuery(prev => {
      const newQuery = { ...prev, page: newPage };
      reloadData(newQuery);
      return { ...prev, page: newPage };
    });
  }

  function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
    setQuery(prev => {
      const newQuery = { ...prev, page: 0, pageSize: parseInt(event.target.value, 10) };
      reloadData(newQuery);
      return newQuery;
    });
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

    setQuery(prev => {
      const newQuery = { ...prev, sort: sort || [] };
      reloadData(newQuery);
      return newQuery;
    });
  }

  const exportCurrentPage = () => {
    if (!exportData) {
      return;
    }

    exportData(query)
      .subscribe({
        next: (data) => {
          const blob = new Blob([data], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');

          a.setAttribute('hidden', '');
          a.setAttribute('href', url);
          a.setAttribute('download', 'export.csv');
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      });
  };

  const exportAllData = () => {
    if (!exportData) {
      return;
    }

    exportData({ sort: query.sort, filters: query.filters })
      .subscribe({
        next: (data) => {
          const blob = new Blob([data], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');

          a.setAttribute('hidden', '');
          a.setAttribute('href', url);
          a.setAttribute('download', 'export.csv');
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      });
  };

  const reloadData = (query: Search) => {
    gridRef.current?.api?.showLoadingOverlay();
      fetch(query).subscribe({
        next: (data) => {
          setData(data);
          resizeGrid();

          if (data.items.length === 0) {
            gridRef.current?.api?.showNoRowsOverlay();
          } else {
            gridRef.current?.api?.hideOverlay();
          }
        },
      });
  };

  const resizeGrid = () => {
    gridRef.current?.api?.sizeColumnsToFit();
  };

  const handleQueryChange = (filters: Filter[]) => {
    setQuery(prev => {
      const newQuery = { ...prev, filters: filters };
      reloadData(newQuery);
      return newQuery;
    });
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenFilters = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilters = () => {
    setAnchorEl(null);
  };

  const getFilterLabel = (filter: Filter) => {
    const Column =
      filters.find((column) => column.id === filter.field)?.name ||
      filter.field;

    const operator = t(Operation.getOperationForSymbol(filter.operator).name).toLowerCase();

    if (filter.value instanceof Array) {
      const options = filters.find((column) => column.id === filter.field)?.options || [];
      const values = filter.value.map(
        (value) => options.find((option) => option.value === value)?.label || value
      );
      
      return (
        <>
          <Label content={Column} />
          {" "}{operator}{" "}
          {values.map((value, index) => (
            <React.Fragment key={index}>
              {value.toString()}
              {index < values.length - 1 && ", "}
            </React.Fragment>
          ))}
        </>
      );
    } else if (filter.value instanceof Date) {
      return (
        <>
          <Label content={Column} />
          {" "}{operator}{" "}
          {filter.value.toLocaleDateString()}
        </>
      );
    } else if (typeof filter.value === "boolean") {
      return (
        <>
          <Label content={Column} />
          {" "}{operator}{" "}
          {filter.value ? t("filters.boolean.true") : t("filters.boolean.false")}
        </>
      )
    } else if (typeof filter.value === "number") {
      return (
        <>
          <Label content={Column} />
          {" "}{operator}{" "}
          {filter.value.toString()}
        </>
      );
    }

    const value = filter.value;
    return (
      <>
        <Label content={Column} />
        {" "}{operator}{" "}
        {value?.toString()}
      </>
    )
  };

  const handleColumnsChange = (columnDefinitions: ColumnDefinition<Type>[]) => {
    gridRef.current?.api?.setColumnDefs(columnDefinitions);
    resizeGrid();
  };

  return (
    <Container elevation={elevation}>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <ColumnPicker columnDefinitions={columnDefinitions} onColumnDefinitionsChange={handleColumnsChange}/>

        <Button variant="text" onClick={handleOpenFilters} sx={{ mb: 1 }}>
          <FilterListIcon sx={{ mr: 1 }} />
          <Typography variant="button">
            {t("actions.filters")}
          </Typography>
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
            filters={filters}
            onQueryChange={handleQueryChange}
          />
        </Popover>

        <Box sx={{ flexGrow: 1 }} />

        {
          exportData &&
            <>
              <Tooltip title={t("actions.exportAllTooltip")}>
                <Button sx={{ mb: 1 }} variant="text" onClick={() => exportAllData()}>
                  <DownloadIcon sx={{ mr: 1 }} />
                  <Typography variant="button">
                    {t("actions.exportAll")}
                  </Typography>
                </Button>
              </Tooltip>
              <Tooltip title={t("actions.exportTooltip")}>
                <Button sx={{ mb: 1 }} variant="text" onClick={() => exportCurrentPage()}>
                  <DownloadOutlinedIcon sx={{ mr: 1 }} />
                  <Typography variant="button">
                    {t("actions.export")}
                  </Typography>
                </Button>
              </Tooltip>
            </>
        }
        <Button sx={{ mb: 1 }} variant="text" onClick={() => reloadData(query)}>
          <RefreshIcon sx={{ mr: 1 }} />
          <Typography variant="button">
            {t("actions.refresh")}
          </Typography>
        </Button>
      </Box>

      {
        !redraw && (
        <div className={`ag-theme-alpine ${styles.grid}`}>
          <AgGridReact<Type>
            domLayout="autoHeight"
            ref={gridRef}
            rowData={data.items}
            columnDefs={columnDefinitions}
            animateRows={true}
            rowSelection="multiple"
            multiSortKey="ctrl"
            suppressDragLeaveHidesColumns={true}
            onSortChanged={(event) => handleSortChange(event)}
            loadingOverlayComponent={LoadingScreen}
            noRowsOverlayComponent={() => (
              <>{t("overlays.noRowsToShow")}</>
            )}
          />
          <Box className={styles.pagination}>
            <TablePagination
              component="div"
              count={data.totalItems}
              page={query.page}
              onPageChange={handleChangePage}
              rowsPerPage={query.pageSize}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={Object.values(PageSizeOptions)}
              labelRowsPerPage={t("pagination.itemsPerPage")}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${t("pagination.of")} ${count}`
              }
            />
          </Box>
        </div>
        )
      }
      
    </Container>
  );
};

interface ContainerProps {
  elevation?: number;
  children: React.ReactNode;
}

const Container = ({ elevation, children }: ContainerProps) => {
  return elevation ? (
    <Paper elevation={elevation} sx={{ p: 2 }}>
      {children}
    </Paper>
  ) : (
    <Box sx={{ p: 2 }}>{children}</Box>
  );
}
