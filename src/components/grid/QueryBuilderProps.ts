import { Filter } from "../../client/types/common/Search";
import { FilterDefinition } from "./FilterDefinition";

export interface QueryBuilderProps {
  initialState?: Filter[];
  filters: FilterDefinition[];
  onQueryChange: (filters: Filter[]) => void;
}
