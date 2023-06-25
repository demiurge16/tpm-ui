import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Operation } from "../Operation";

export interface OperatorPickerProps {
  selectedOperator: string;
  operations: Operation[];
  onChange: (operator: Operation) => void;
}

export const OperatorPicker = (props: OperatorPickerProps) => {
  const { selectedOperator, operations, onChange } = props;
  const defaultOperator = props.operations[0];

  const [state, setState] = useState<string>(selectedOperator);

  const handleChange = (operator: string) => {
    let operation = operations.find(o => o.symbol === operator);
    setState(operation?.symbol ?? defaultOperator.symbol);
    onChange(operation ?? defaultOperator);
  };

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id="operator-selector-label">Operator</InputLabel>
      <Select id="operator-selector"
        labelId="operator-selector-label"
        value={selectedOperator}
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