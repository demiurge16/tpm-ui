import { Operation } from "./Operation";

export interface QueryableColumnDefinition {
  id: string;
  name: string;
  sortable: boolean;
  filter: boolean;
  operations?: Operation[];
}
