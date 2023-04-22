import { Filter } from "../../client/types/common/Search";
import { QueryableColumnDefinition } from "./QueryableColumnDefinition";

export interface QueryBuilderProps{
  queryDefinitions: QueryableColumnDefinition[];
  onQueryChange: (filters: Filter[]) => void;
}
