import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Operation } from "../Operation";

export interface OperatorPickerProps {
  value: Operation | string | undefined | null;
  operations: Operation[];
  onChange: (operator: Operation) => void;
}

export const OperatorPicker = (props: OperatorPickerProps) => {
  const defaultOperator = props.operations[0];

  const [operations, onChange] = [props.operations, props.onChange];
  const [operator, setOperator] = useState<string>(defaultOperator.symbol);

  const handleChange = (operator: string) => {
    let operation = operations.find(o => o.symbol === operator);
    
    setOperator(operation?.symbol ?? defaultOperator.symbol);
    onChange(operation ?? defaultOperator);
  };

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id="operator-selector-label">Operator</InputLabel>
      <Select id="operator-selector"
        labelId="operator-selector-label"
        value={operator}
        onChange={(e) => handleChange(e.target.value as string)}
        label="Operator"
      >
        {
          operations.map(operation => (
            <MenuItem key={operation.symbol} value={operation.symbol}>{operation.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}