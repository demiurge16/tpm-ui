import { FilterOperator } from "../../client/types/common/Search";

export class Operation {
  constructor(public symbol: FilterOperator, public name: string) { }

  static EQUALS = new Operation("eq", "Is equal to");
  static CONTAINS = new Operation("contains", "Contains");
  static GREATER_THAN = new Operation("gt", "Greater than");
  static LESS_THAN = new Operation("lt", "Less than");
  static GREATER_THAN_OR_EQUAL = new Operation("gte", "Greater than or equal");
  static LESS_THAN_OR_EQUAL = new Operation("lte", "Less than or equal");
  static ANY = new Operation("any", "Is any of");
  static ALL = new Operation("all", "Is all of");
  static NONE = new Operation("none", "Is none of");
  static IS_NULL = new Operation("null", "Is null");
  static IS_EMPTY = new Operation("empty", "Is empty");

  static getOperationsForSymbol(type: FilterOperator): Operation {
    switch (type) {
      case "eq":
        return Operation.EQUALS;
      case "contains":
        return Operation.CONTAINS;
      case "gt":
        return Operation.GREATER_THAN;
      case "lt":
        return Operation.LESS_THAN;
      case "gte":
        return Operation.GREATER_THAN_OR_EQUAL;
      case "lte":
        return Operation.LESS_THAN_OR_EQUAL;
      case "any":
        return Operation.ANY;
      case "all":
        return Operation.ALL;
      case "none":
        return Operation.NONE;
      case "null":
        return Operation.IS_NULL;
      case "empty":
        return Operation.IS_EMPTY;
      default:
        throw new Error(`Unknown filter operator: ${type}`);
    }
  }
}
