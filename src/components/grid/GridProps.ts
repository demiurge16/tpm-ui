import { ColDef, ColGroupDef } from "ag-grid-community";

export interface GridProps<Type> {
  startPage: number;
  pageSize: number;
  columnDefinitions: (ColDef<Type> | ColGroupDef<Type>)[];
  url: string;
  queriesUrl: string;
  queryDefinitions: { id: string, name: string, filter: boolean, sortable: boolean }[];
}
