import React from "react";
import { Field } from "./Field";
import { Operation } from "./Operation";

export class FilterDefinition {
  private constructor(
    public id: string,
    public name: React.ReactNode | React.ComponentType,
    public type: Field,
    public options?: { value: string, label: React.ReactNode | React.ComponentType }[]
  ) { }

  public getDefaultOperation(): Operation {
    return this.type.operations[0];
  }

  public getOptions(): { value: string, label: React.ReactNode | React.ComponentType }[] {
    return this.options || [];
  }

  public static uniqueToken(id: string, name: React.ReactNode | React.ComponentType ): FilterDefinition {
    return new FilterDefinition(id, name, Field.UNIQUE_TOKEN);
  }

  public static string(id: string, name: React.ReactNode | React.ComponentType): FilterDefinition {
    return new FilterDefinition(id, name, Field.STRING);
  }

  public static number(id: string, name: React.ReactNode | React.ComponentType): FilterDefinition {
    return new FilterDefinition(id, name, Field.NUMBER);
  }

  public static date(id: string, name: React.ReactNode | React.ComponentType): FilterDefinition {
    return new FilterDefinition(id, name, Field.DATE);
  }

  public static datetime(id: string, name: React.ReactNode | React.ComponentType): FilterDefinition {
    return new FilterDefinition(id, name, Field.DATETIME);
  }

  public static boolean(id: string, name: React.ReactNode | React.ComponentType): FilterDefinition {
    return new FilterDefinition(id, name, Field.BOOLEAN);
  }

  public static select(id: string, name: React.ReactNode | React.ComponentType, options: { value: string, label: React.ReactNode | React.ComponentType }[]): FilterDefinition {
    return new FilterDefinition(id, name, Field.SELECT, options);
  }

  public static multiSelect(id: string, name: React.ReactNode | React.ComponentType, options: { value: string, label: React.ReactNode | React.ComponentType }[]): FilterDefinition {
    return new FilterDefinition(id, name, Field.MULTISELECT, options);
  }
}
