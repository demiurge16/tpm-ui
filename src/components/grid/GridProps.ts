import { ColDef } from "ag-grid-community";
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
  fetch: (search: Search) => Observable<Page<Type>>;
  export?: (search: Partial<Search>) => Observable<any>;
  innerRef?: React.Ref<GridHandle>;
  elevation?: number;
}
