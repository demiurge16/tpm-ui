import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'react-final-form';

export interface SelectFieldProps {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: boolean;
  options: { key: string, value: string }[];
}

export const SelectField = (props: SelectFieldProps) => {

  const { name, label, required, defaultValue, options } = props;
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
            {
              options.map(option => (
                <MenuItem key={option.key} value={option.key}>{option.value}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      )}
    </Field>
  );
}
