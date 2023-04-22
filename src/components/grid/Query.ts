import { Filter } from "./Filter";

export interface Query {
  page: number;
  pageSize: number;
  sort: string;
  filters: Filter[];
}
