import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'react-final-form';

export interface SelectFieldProps {
  name: string;
  label: string;
  multiple?: boolean;
  required?: boolean;
  defaultValue?: [];
  disabled?: boolean;
  options: { key: string, value: string }[];
}

export const SelectField = (props: SelectFieldProps) => {
  const { name, label, multiple, required, disabled, options } = props;
  const labelId = `${name}-label`;

  return (
    <Field name={name} disabled={disabled}>
      {({ input, meta }) => (
        <FormControl variant="outlined" fullWidth margin="normal" error={meta.error && meta.touched}>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            {...input}
            label={label}
            labelId={labelId}
            displayEmpty
            multiple={multiple}
            required={required}
            inputProps={{ name: label, id: label }}
            error={(meta.error && meta.touched) || meta.submitError}
            value={input.value || (multiple ? [] : '')}
          >
            {
              options.map(option => (
                <MenuItem key={option.key} value={option.key}>
                  {option.value}
                </MenuItem>
              ))
            }
          </Select>
          <FormHelperText error={(meta.error && meta.touched) || meta.submitError}>
            {(meta.touched && meta.error) || meta.submitError}
          </FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}
