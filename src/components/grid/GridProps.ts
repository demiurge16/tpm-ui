import { ColDef, ColGroupDef } from "ag-grid-community";
import { Grid } from "./Grid";
import { QueryableColumnDefinition } from "./QueryableColumnDefinition";

export interface GridProps<Type> {
  startPage: number;
  pageSize: number;
  columnDefinitions: (ColDef<Type> | ColGroupDef<Type>)[];
  url: string;
  queryDefinitions: QueryableColumnDefinition[];
}
