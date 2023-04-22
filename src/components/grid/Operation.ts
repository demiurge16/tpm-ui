import { FilterOperator } from "../../client/types/common/Search";

export class Operation {
  constructor(public symbol: FilterOperator, public name: string) { }

  static EQUALS = new Operation("eq", "Is equal to");
  static CONTAINS = new Operation("contains", "Contains");
  static GREATER_THAN = new Operation("gt", "Greater than");
  static LESS_THAN = new Operation("lt", "Less than");
  static GREATER_THAN_OR_EQUAL = new Operation("gte", "Greater than or equal");
  static LESS_THAN_OR_EQUAL = new Operation("lte", "Less than or equal");
  static ANY = new Operation("any", "Any");
  static ALL = new Operation("all", "All");
  static NONE = new Operation("none", "None");
  static IS_NULL = new Operation("null", "Is null");
  static IS_EMPTY = new Operation("empty", "Is empty");
}
