import { FormControl } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { Field } from "react-final-form";

export interface DateFieldProps {
  name: string;
  label: string;
  required?: boolean;
}

export const DateTimeField = (props: DateFieldProps) => {
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
          <DateTimePicker
            label={label}
            ampm={false}
            format="DDD HH:mm"
            value={input.value ? DateTime.fromJSDate(new Date(input.value)) : null}
            onChange={(value) => input.onChange(value?.toJSDate() ?? null)}
            slotProps={{
              textField: {
                error: (meta.error && meta.touched) || meta.submitError,
                helperText: meta.error || meta.submitError
              }
            }}
          />
        </FormControl>
      )}
    </Field>
  );
}