import { FormControl, FormHelperText } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Field } from "react-final-form";

export interface DateFieldProps {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: Date;
}

export const DateField = (props: DateFieldProps) => {
  const { name, label, required, defaultValue } = props;

  return (
    <Field name={name} defaultValue={defaultValue}>
      {({ input, meta }) => (
        <FormControl variant="outlined"
          fullWidth
          margin="normal"
          error={meta.error && meta.touched}
          required={required}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
        >
          <DatePicker
            onChange={input.onChange}
            label={label}
            format="DDD"
          />
          <FormHelperText>{meta.error && meta.touched && meta.error}</FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}