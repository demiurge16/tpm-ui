enum OperationSymbol {
  EQUALS = "eq",
  CONTAINS = "contains",
  GREATER_THAN = "gt",
  LESS_THAN = "lt",
  GREATER_THAN_OR_EQUAL = "gte",
  LESS_THAN_OR_EQUAL = "lte",
  ANY = "any",
  ALL = "all",
  IS_NULL = "null",
  IS_EMPTY = "empty"
}

export class Operation {
  constructor(public symbol: OperationSymbol, public name: string) { }

  static EQUALS = new Operation(OperationSymbol.EQUALS, "Is equal to");
  static CONTAINS = new Operation(OperationSymbol.CONTAINS, "Contains");
  static GREATER_THAN = new Operation(OperationSymbol.GREATER_THAN, "Greater than");
  static LESS_THAN = new Operation(OperationSymbol.LESS_THAN, "Less than");
  static GREATER_THAN_OR_EQUAL = new Operation(OperationSymbol.GREATER_THAN_OR_EQUAL, "Greater than or equal");
  static LESS_THAN_OR_EQUAL = new Operation(OperationSymbol.LESS_THAN_OR_EQUAL, "Less than or equal");
  static ANY = new Operation(OperationSymbol.ANY, "Any");
  static ALL = new Operation(OperationSymbol.ALL, "All");
  static IS_NULL = new Operation(OperationSymbol.IS_NULL, "Is null");
  static IS_EMPTY = new Operation(OperationSymbol.IS_EMPTY, "Is empty");
}
