import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FormControl, InputLabel, Input, TextField, Chip } from "@mui/material";

export interface StringFilterProps {
  id: string;
  label: string;
  value: string | null;
  onChange: (value: string) => void;
}

export interface MultivalueStringFilterProps {
  id: string;
  label: string;
  value: string[] | null;
  onChange: (value: string[]) => void;
}

export const StringFilter = (props: StringFilterProps) => {

  const [id, label, value, onChange] = [props.id, props.label, props.value, props.onChange];

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Input id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
}

export const MultivalueStringFilter = (props: MultivalueStringFilterProps) => {
  const [id, label, value, onChange] = [props.id, props.label, props.value, props.onChange];
  const [values, setValues] = useState<Array<string>>(value ?? []);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      if (values.find((value) => value === inputValue)) {
        setInputValue('');
        return;
      }

      setValues((prevValues) => {
        const newValues = [...prevValues, inputValue]
        onChange(newValues);
        return newValues;
      });
      setInputValue('');
    }
  };

  const handleDelete = (valueToDelete: string) => () => {
    setValues(prevValues => {
      const newValues = prevValues.filter((value) => value !== valueToDelete);
      onChange(newValues);
      return newValues;
    });
  };

  return (
    <>
      <TextField
        label={label}
        variant="standard"
        fullWidth
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        InputProps={{
          startAdornment: values.map((value, index) => (
            <Chip
              key={index}
              label={value}
              onDelete={handleDelete(value)}
              style={{ margin: '2px' }}
            />
          )),
        }}
      />
      <input id={id} type="hidden" value={values} />
    </>
  );
};