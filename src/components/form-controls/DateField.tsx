import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { Field } from "react-final-form";

export interface DateFieldProps {
  name: string;
  label: string;
  required?: boolean;
}

export const DateField = (props: DateFieldProps) => {
  const { name, label, required } = props;

  return (
    <Field name={name}>
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
            label={label}
            format="DDD"
            value={input.value ? DateTime.fromJSDate(new Date(input.value)) : null}
            onChange={(value) => input.onChange(value?.toJSDate() ?? null)}
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