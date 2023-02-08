import { FormControl, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";


export interface DateTimeFilterProps {
  id: string;
  label: string;
  value: Date | string | null;
  onChange: (value: Date | null) => void;
}

export const DateTimeFilter = (props: DateTimeFilterProps) => {

  const [id, label, value, onChange] = [props.id, props.label, props.value, props.onChange];

  return (
    <FormControl variant="outlined" size='small' fullWidth>
      <DateTimePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField id={id} {...params} variant="outlined" size='small' />}
      />
    </FormControl>
  );
}
