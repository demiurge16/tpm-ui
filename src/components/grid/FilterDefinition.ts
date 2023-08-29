import { Field } from "./Field";
import { Operation } from "./Operation";

export class FilterDefinition {
  private constructor(
    public id: string,
    public name: string,
    public type: Field,
    public options?: { value: string, label: string }[]
  ) { }

  public getDefaultOperation(): Operation {
    return this.type.operations[0];
  }

  public getOptions(): { value: string, label: string }[] {
    return this.options || [];
  }

  public static uniqueToken(id: string, name: string): FilterDefinition {
    return new FilterDefinition(id, name, Field.UNIQUE_TOKEN);
  }

  public static string(id: string, name: string): FilterDefinition {
    return new FilterDefinition(id, name, Field.STRING);
  }

  public static number(id: string, name: string): FilterDefinition {
    return new FilterDefinition(id, name, Field.NUMBER);
  }

  public static date(id: string, name: string): FilterDefinition {
    return new FilterDefinition(id, name, Field.DATE);
  }

  public static datetime(id: string, name: string): FilterDefinition {
    return new FilterDefinition(id, name, Field.DATETIME);
  }

  public static boolean(id: string, name: string): FilterDefinition {
    return new FilterDefinition(id, name, Field.BOOLEAN);
  }

  public static select(id: string, name: string, options: { value: string, label: string }[]): FilterDefinition {
    return new FilterDefinition(id, name, Field.SELECT, options);
  }

  public static multiSelect(id: string, name: string, options: { value: string, label: string }[]): FilterDefinition {
    return new FilterDefinition(id, name, Field.MULTISELECT, options);
  }
}
