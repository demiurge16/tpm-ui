import { TextField } from '@mui/material';
import { Field } from 'react-final-form';

export interface NumberInputProps {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
}

export const NumberField = (props: NumberInputProps) => {
  const { name, label, required, defaultValue } = props;

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
} 
