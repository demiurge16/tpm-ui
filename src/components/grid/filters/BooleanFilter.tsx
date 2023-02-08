import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export interface BooleanFilterProps {
  id: string;
  label: string;
  value: boolean | string | null;
  onChange: (value: boolean) => void;
}

export const BooleanFilter = (props: BooleanFilterProps) => {

  const [id, label, value, onChange] = [props.id, props.label, props.value, props.onChange];
  const labelId = `${id}-label`;

  return (
    <FormControl variant="outlined" size='small' fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select id={id}
        labelId={labelId}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value as boolean)}
      >
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="true">False</MenuItem>
      </Select>
    </FormControl>
  )
}
