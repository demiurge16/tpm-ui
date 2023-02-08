import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

export interface NumberFilterProps {
  id: string;
  label: string;
  value: number | string | null;
  onChange: (value: number | null) => void;
}

export const NumberFilter = (props: NumberFilterProps) => {

  const [id, label, value, onChange] = [props.id, props.label, props.value, props.onChange];

  return (
    <FormControl variant="outlined" size='small' fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <OutlinedInput id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        label={label}
      />
    </FormControl>
  );
}
