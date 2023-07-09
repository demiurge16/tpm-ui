import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'react-final-form';

export interface BooleanFieldProps {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: boolean;
}

export const BooleanField = (props: BooleanFieldProps) => {

  const { name, label, required, defaultValue } = props;
  const labelId = `${name}-label`;

  return (
    <Field name={name} defaultValue={defaultValue}>
      {({ input, meta }) => (
        <FormControl variant="outlined" fullWidth margin="normal" error={meta.error && meta.touched}>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            {...input}
            label={label}
            labelId={labelId}
            displayEmpty
            required={required}
            inputProps={{ name: label, id: label }}
          >
            <MenuItem key="false" value="false">No</MenuItem>
            <MenuItem key="true" value="true">Yes</MenuItem>
          </Select>
          <FormHelperText>{meta.error && meta.touched && meta.error}</FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}