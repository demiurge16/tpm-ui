import { Query } from "./Query";
import { QueryableColumnDefinition } from "./QueryableColumnDefinition";

export interface QueryBuilderProps<Type> {
  url: string;
  queryDefinitions: QueryableColumnDefinition[];
  onQueryChange: (query: Query) => void;
}
