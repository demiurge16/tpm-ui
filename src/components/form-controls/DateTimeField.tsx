import { FormControl } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Field } from "react-final-form";

export interface DateFieldProps {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: Date;
}

export const DateTimeField = (props: DateFieldProps) => {
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
          <DateTimePicker
            onChange={input.onChange}
            label={label}
            ampm={false}
            format="DDD HH:mm"
            slotProps={{
              textField: {
                error: meta.error && meta.touched,
                helperText: meta.error && meta.touched && meta.error,
              },
            }}
          />
        </FormControl>
      )}
    </Field>
  );
}