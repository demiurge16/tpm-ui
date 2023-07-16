import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export interface DateFilterProps {
  id: string;
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
}

export const DateFilter = (props: DateFilterProps) => {

  const [id, label, value, onChange] = [props.id, props.label, props.value, props.onChange];

  return (
    <FormControl id={id} variant="standard" size="small" fullWidth>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
}
