import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export interface FieldPickerProps {
  fields: { id: string, name: string }[];
  onChange: (field: string) => void;
}

export const FieldPicker = (props: FieldPickerProps) => {
  const [fields, onChange] = [props.fields, props.onChange];
  const [field, setField] = useState<string>(fields[0].id);

  const handleChange = (field: string) => {
    setField(field);
    onChange(field);
  };

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id="field-selector-label">Field</InputLabel>
      <Select id="field-selector"
        labelId="field-selector-label"
        value={field}
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

