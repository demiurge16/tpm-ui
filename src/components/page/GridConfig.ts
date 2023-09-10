import { FilterDefinition } from "../grid/FilterDefinition";
import { ColumnDefinition } from "../grid/GridProps";

export interface GridConfig<Type> {
  page: number;
  pageSize: number;
  columnDefs: Array<ColumnDefinition<Type>>;
  filters: Array<FilterDefinition>;
}
