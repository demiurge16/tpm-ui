export interface Filter {
  field: string | null;
  value: string | string[] | null;
  operator: string | null;
}
