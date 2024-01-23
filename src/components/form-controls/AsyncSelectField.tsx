import { Autocomplete, FormControl, TextField } from "@mui/material";
import { Field } from "react-final-form";

type Option = {
  key: string;
  value: string;
};

export interface AsyncSelectFieldProps {
  name: string;
  label: string;
  multiple?: boolean;
  required?: boolean;
  options: Option[];
}

export const AsyncSelectField = (
  { name, label, multiple, required, options }: AsyncSelectFieldProps
) => {
  return (
    <Field name={name} multiple={multiple} required={required}>
      {({ input, meta }) => {
        return input.multiple ? (
          <FormControl variant="outlined" fullWidth margin="normal">
            <Autocomplete multiple
              value={options.filter((option) => input.value.includes(option.key))}
              options={options}
              onChange={(event, newValue) => input.onChange(newValue.map((option) => option.key))}
              getOptionLabel={(option) => option.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label + (required ? " *" : "")}
                  variant="outlined"
                  error={(meta.error && meta.touched) || meta.submitError}
                  helperText={meta.error || meta.submitError}
                />
              )}
            />
          </FormControl>
        ) : (
          <FormControl variant="outlined" fullWidth margin="normal">
            <Autocomplete
              value={options.find((option) => option.key === input.value)}
              options={options}
              onChange={(event, newValue) => input.onChange(newValue?.key)}
              getOptionLabel={(option) => option.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label + (required ? " *" : "")}
                  variant="outlined"
                  error={(meta.error && meta.touched) || meta.submitError}
                  helperText={meta.error || meta.submitError}
                />
              )}
            />
          </FormControl>
        )}}
    </Field>
  );
}
