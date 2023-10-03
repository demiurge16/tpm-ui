import { FilterOperator } from "../../client/types/common/Search";

export class Operation {
  constructor(public symbol: FilterOperator, public name: string, public multivalue: boolean) { }

  static EQUALS = new Operation("eq", "filters.operation.eq", false);
  static CONTAINS = new Operation("contains", "filters.operation.contains", false);
  static GREATER_THAN = new Operation("gt", "filters.operation.gt", false);
  static LESS_THAN = new Operation("lt", "filters.operation.lt", false);
  static GREATER_THAN_OR_EQUAL = new Operation("gte", "filters.operation.gte", false);
  static LESS_THAN_OR_EQUAL = new Operation("lte", "filters.operation.lte", false);
  static ANY = new Operation("any", "filters.operation.any", true);
  static ALL = new Operation("all", "filters.operation.all", true);
  static NONE = new Operation("none", "filters.operation.none", true);
  static IS_NULL = new Operation("null", "filters.operation.null", false);
  static IS_EMPTY = new Operation("empty", "filters.operation.empty", false);

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
