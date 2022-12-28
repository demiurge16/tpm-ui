import { Filter } from "./Filter";
import { SortDirection } from "./SortDirection";

export interface Query {
  page: number;
  pageSize: number;
  sort: string;
  direction: SortDirection;
  filters: Filter[];
}
