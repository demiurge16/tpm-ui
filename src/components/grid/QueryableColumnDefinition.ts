import { Field } from "./Field";

export interface QueryableColumnDefinition {
  id: string;
  name: string;
  filter: boolean;
  type: Field;
  options?: { value: string, label: string }[];
}
