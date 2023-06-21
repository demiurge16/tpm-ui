export interface Search {
  page: number;
  pageSize: number;
  sort: Sort[];
  filters: Filter[];
}

export type SortDirection = 'asc' | 'desc';
export type Sort = {
  field: string;
  direction: SortDirection;
};

export type FilterOperator = 'eq' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte' | 'any' | 'all' | 'none' | 'null' | 'empty';
export interface Filter {
  field: string;
  operator: FilterOperator;
  value: FilterValue;
};

export type FilterValue = string | number | boolean | Date | string[];