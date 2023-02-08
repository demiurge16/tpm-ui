import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

export interface StringFilterProps {
  id: string;
  label: string;
  value: string | null;
  onChange: (value: string) => void;
}

export const StringFilter = (props: StringFilterProps) => {

  const [id, label, value, onChange] = [props.id, props.label, props.value, props.onChange];

  return (
    <FormControl variant="outlined" size='small' fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <OutlinedInput id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
      />
    </FormControl>
  );
}
