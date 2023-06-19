import { TextField } from "@mui/material";
import { Field } from "react-final-form";

export interface NumberFieldProps {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
}

export const NumberField = (props: NumberFieldProps) => {
  const { name, label, required, defaultValue } = props;

  return (
    <Field name={name} defaultValue={defaultValue}>
      {({ input, meta }) => (
        <TextField
          {...input}
          label={label}
          type="number"
          required={required}
          margin="normal"
          fullWidth
          variant="outlined"
          error={meta.error && meta.touched}
          helperText={meta.error}
        />
      )}
    </Field>
  );
};
