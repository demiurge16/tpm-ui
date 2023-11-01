import { Ref } from "react";
import { ColDef, GetRowIdParams } from "ag-grid-community";
import { FilterDefinition } from "./FilterDefinition";
import { Observable } from "rxjs";
import { Search } from "../../client/types/common/Search";
import { Page } from "../../client/types/common/Page";

export type GridHandle = {
  refresh: () => void;
};

export type ColumnDefinition<Type> = ColDef<Type>;

export interface GridProps<Type> {
  startPage: number;
  pageSize: number;
  columnDefinitions: ColumnDefinition<Type>[];
  filters: FilterDefinition[];
  getRowId?: (row: GetRowIdParams<Type>) => string;
  fetch: (search: Search) => Observable<Page<Type>>;
  exportData?: (search: Partial<Search>) => Observable<any>;
  innerRef?: Ref<GridHandle>;
  elevation?: number;
}
