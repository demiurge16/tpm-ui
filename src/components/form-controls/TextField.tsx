import { TextField as MuiTextField } from '@mui/material';
import { Field } from 'react-final-form';

export interface TextInputProps {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  multiline?: boolean;
  rows?: number;
}

export const TextField = (props: TextInputProps) => {
  const { name, label, required, defaultValue, multiline, rows } = props;

  return <Field name={name} defaultValue={defaultValue}>
    {({ input, meta }) => (
      <MuiTextField
        {...input}
        label={label}
        type="text"
        required={required}
        margin="normal"
        fullWidth
        variant="outlined"
        error={meta.error && meta.touched}
        helperText={meta.error}
        multiline={multiline}
        rows={rows ?? 1}
      />
    )}
  </Field>
} 
