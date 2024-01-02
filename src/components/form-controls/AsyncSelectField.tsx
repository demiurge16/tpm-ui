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
        const onChange = (event: any, newValue: Option | Option[] | null) => {
          if (input.multiple) {
            input.onChange(newValue.map((option) => option.key));
          } else {
            input.onChange(newValue?.key);
          }
        };

        const value = input.multiple
          ? options.filter((option) => input.value.includes(option.key))
          : options.find((option) => option.key === input.value);

        return (
          <FormControl 
            variant="outlined"
            fullWidth
            margin="normal"
          >
            <Autocomplete
              multiple={multiple}
              value={value}
              options={options}
              onChange={onChange}
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
