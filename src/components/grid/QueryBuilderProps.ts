import { Query } from "./Query";

export interface QueryBuilderProps<Type> {
  url: string;
  queriesUrl: string;
  queryDefinitions: { id: string, name: string, filter: boolean, sortable: boolean }[];
  onQueryChange: (query: Query) => void;
}
