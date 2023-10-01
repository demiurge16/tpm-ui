import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export interface BooleanFilterProps {
  id: string;
  label: string;
  value: boolean | string | null;
  onChange: (value: boolean) => void;
}

export const BooleanFilter = (
  { id, label, value, onChange }: BooleanFilterProps
) => {
  const labelId = `${id}-label`;
  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select id={id}
        labelId={labelId}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value as boolean)}
      >
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </Select>
    </FormControl>
  )
}
