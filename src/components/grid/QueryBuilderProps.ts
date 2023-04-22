import { Filter } from "./Filter";
import { QueryableColumnDefinition } from "./QueryableColumnDefinition";

export interface QueryBuilderProps{
  url: string;
  queryDefinitions: QueryableColumnDefinition[];
  onQueryChange: (filters: Filter[]) => void;
}
