import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Chip, TextField as MuiTextField } from '@mui/material';
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

  return (
    <Field name={name} defaultValue={defaultValue}>
      {({ input, meta }) => (
        <MuiTextField
          {...input}
          label={label}
          type="text"
          required={required}
          margin="normal"
          fullWidth
          variant="outlined"
          error={(meta.error && meta.touched) || meta.submitError}
          helperText={meta.error || meta.submitError}
          multiline={multiline}
          rows={rows ?? 1}
        />
      )}
    </Field>
  );
}

export interface MultivalueStringInputProps {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string[];
}

export const MultivalueStringField = (props: MultivalueStringInputProps) => {
  const { name, label, required, defaultValue } = props;
  const [values, setValues] = useState<Array<string>>(defaultValue ?? []);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLDivElement>, callback: (values: string[]) => void) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      if (values.find((value) => value === inputValue)) {
        setInputValue('');
        return;
      }

      setValues((prevValues) => {
        const newValues = [...prevValues, inputValue];
        callback(newValues);
        return newValues;
      });
      setInputValue('');
    }
  };

  const handleDelete = (valueToDelete: string, callback: (values: string[]) => void) => () => {
    setValues(prevValues => {
      const newValues = prevValues.filter((value) => value !== valueToDelete);
      callback(newValues);
      return newValues;
    });
  };

  return (
    <Field name={name} defaultValue={defaultValue}>
      {({ input, meta }) => (
        <>
          <MuiTextField
            label={required ? `${label} *` : label}
            variant="outlined"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) =>  handleInputKeyDown(e, input.onChange)}
            error={(meta.error && meta.touched) || meta.submitError}
            helperText={meta.error || meta.submitError}
            InputProps={{
              startAdornment: values.map((value, index) => (
                <Chip
                  key={index}
                  label={value}
                  onDelete={() => handleDelete(value, input.onChange)}
                  style={{ margin: '2px' }}
                />
              )),
            }}
          />
          <input {...input} type="hidden"/>
        </>
      )}
    </Field>
  );
}
