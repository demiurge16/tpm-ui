import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FormControl, InputLabel, Input, TextField, Chip } from "@mui/material";

export interface StringFilterProps {
  id: string;
  label: string | React.ComponentType<object>;
  value: string | null;
  onChange: (value: string) => void;
}

export interface MultivalueStringFilterProps {
  id: string;
  label: string | React.ComponentType<object>;
  value: string[] | null;
  onChange: (value: string[]) => void;
}

export const StringFilter = (props: StringFilterProps) => {
  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id={props.id}>
        {typeof props.label === "string" ? props.label : <props.label />}
      </InputLabel>
      <Input id={props.id}
        type="text"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </FormControl>
  );
}

export const MultivalueStringFilter = (props: MultivalueStringFilterProps) => {
  const [values, setValues] = useState<Array<string>>(props.value ?? []);
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
        props.onChange(newValues);
        return newValues;
      });
      setInputValue('');
    }
  };

  const handleDelete = (valueToDelete: string) => () => {
    setValues(prevValues => {
      const newValues = prevValues.filter((value) => value !== valueToDelete);
      props.onChange(newValues);
      return newValues;
    });
  };

  return (
    <>
      <TextField
        label={typeof props.label === "string" ? props.label : <props.label />}
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
      <input id={props.id} type="hidden" value={values} />
    </>
  );
};