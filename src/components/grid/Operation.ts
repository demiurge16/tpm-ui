import { FilterOperator } from "../../client/types/common/Search";

export class Operation {
  constructor(public symbol: FilterOperator, public name: string, public multivalue: boolean) { }

  static EQUALS = new Operation("eq", "Is equal to", false);
  static CONTAINS = new Operation("contains", "Contains", false);
  static GREATER_THAN = new Operation("gt", "Greater than", false);
  static LESS_THAN = new Operation("lt", "Less than", false);
  static GREATER_THAN_OR_EQUAL = new Operation("gte", "Greater than or equal", false);
  static LESS_THAN_OR_EQUAL = new Operation("lte", "Less than or equal", false);
  static ANY = new Operation("any", "Is any of", true);
  static ALL = new Operation("all", "Is all of", true);
  static NONE = new Operation("none", "Is none of", true);
  static IS_NULL = new Operation("null", "Is null", false);
  static IS_EMPTY = new Operation("empty", "Is empty", false);

  static getOperationForSymbol(type: FilterOperator): Operation {
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
