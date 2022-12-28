import { Operator } from "./Operator";

export interface Filter {
  field: string;
  value: string;
  operator: Operator;
}
