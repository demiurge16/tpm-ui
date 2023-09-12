import { FilterDefinition } from "./FilterDefinition";
import { ColumnDefinition } from "./GridProps";

export interface GridConfig<Type> {
  page: number;
  pageSize: number;
  columnDefs: Array<ColumnDefinition<Type>>;
  filters: Array<FilterDefinition>;
}
