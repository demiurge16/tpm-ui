import { ColDef, ColGroupDef } from "ag-grid-community";
import { QueryableColumnDefinition } from "./QueryableColumnDefinition";
import { Observable } from "rxjs";
import { Search } from "../../client/types/common/Search";
import { Page } from "../../client/types/common/Page";

export interface GridProps<Type> {
  startPage: number;
  pageSize: number;
  columnDefinitions: (ColDef<Type> | ColGroupDef<Type>)[];
  fetch: (search: Search) => Observable<Page<Type>>;
  queryDefinitions: QueryableColumnDefinition[];
}
