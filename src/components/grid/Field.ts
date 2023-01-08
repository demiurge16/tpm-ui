import { FieldType } from "./FieldType";
import { Operation } from "./Operation";

export class Field {
  constructor(public type: FieldType, public name: string, public operations: Operation[]) { }

  static STRING = new Field(FieldType.STRING, "String", [
    Operation.EQUALS,
    Operation.CONTAINS,
    Operation.IS_NULL,
    Operation.IS_EMPTY
  ]);

  static NUMBER = new Field(FieldType.NUMBER, "Number", [
    Operation.EQUALS,
    Operation.GREATER_THAN,
    Operation.LESS_THAN,
    Operation.GREATER_THAN_OR_EQUAL,
    Operation.LESS_THAN_OR_EQUAL,
    Operation.IS_NULL
  ]);

  static DATE = new Field(FieldType.DATE, "Date", [
    Operation.EQUALS,
    Operation.GREATER_THAN,
    Operation.LESS_THAN,
    Operation.GREATER_THAN_OR_EQUAL,
    Operation.LESS_THAN_OR_EQUAL,
    Operation.IS_NULL
  ]);

  static BOOLEAN = new Field(FieldType.BOOLEAN, "Boolean", [
    Operation.EQUALS,
    Operation.IS_NULL
  ]);

  static SELECT = new Field(FieldType.SELECT, "Select", [
    Operation.EQUALS,
    Operation.ANY,
    Operation.ALL,
    Operation.IS_NULL
  ]);

  static MULTI_SELECT = new Field(FieldType.MULTI_SELECT, "Multi Select", [
    Operation.ANY,
    Operation.ALL,
    Operation.IS_NULL
  ]);
}
