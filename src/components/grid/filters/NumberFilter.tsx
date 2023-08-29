import React, { useState } from "react";
import { FormControl, InputLabel, Input, TextField, Chip } from "@mui/material";

export interface NumberFilterProps {
  id: string;
  label: string;
  value: number | string | null;
  onChange: (value: number | null) => void;
}

export interface MultivalueNumberFilterProps {
  id: string;
  label: string;
  value: number[] | null;
  onChange: (value: number[]) => void;
}

export const NumberFilter = (props: NumberFilterProps) => {
  const [id, label, value, onChange] = [props.id, props.label, props.value, props.onChange];

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Input id={id}
        type="number"
        value={value}
        onChange={(e) => {
          if (e.target.value === '') {
            onChange(null);
          } else {
            onChange(parseFloat(e.target.value));
          }
        }}
      />
    </FormControl>
  );
}

export const MultivalueNumberFilter = (props: MultivalueNumberFilterProps) => {
  const [id, label, value, onChange] = [props.id, props.label, props.value, props.onChange];
  const [values, setValues] = useState<Array<number>>(value ?? []);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      if (values.find((value) => value === parseFloat(inputValue))) {
        setInputValue('');
        return;
      }

      setValues((prevValues) => {
        const newValues = [...prevValues, parseFloat(inputValue)]
        onChange(newValues);
        return newValues;
      });
      setInputValue('');
    }
  };

  const handleDelete = (valueToDelete: number) => () => {
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
      <input id={id} type="hidden" value={values.map(e => e.toString())} />
    </>
  );
};
