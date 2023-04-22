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
export type Filter = {
  field: string;
  operator: FilterOperator;
  value?: string | string[];
};
