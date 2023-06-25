import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export interface FieldPickerProps {
  selectedField: string;
  fields: { id: string, name: string }[];
  onChange: (field: string) => void;
}

export const FieldPicker = (props: FieldPickerProps) => {
  const { selectedField, fields, onChange } = props;
  const [state, setState] = useState<string>(selectedField);

  const handleChange = (field: string) => {
    setState(field);
    onChange(field);
  };

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id="field-selector-label">Field</InputLabel>
      <Select id="field-selector"
        labelId="field-selector-label"
        value={selectedField}
        onChange={(e) => handleChange(e.target.value as string)}
        label="Field"
      >
        {
          fields.map(field => (
            <MenuItem key={field.id} value={field.id}>{field.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

