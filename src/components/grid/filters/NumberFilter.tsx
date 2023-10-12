import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FormControl, InputLabel, Input, TextField, Chip } from "@mui/material";
import { Label } from "../../utils/Label";

export interface NumberFilterProps {
  id: string;
  label: React.ReactNode | React.ComponentType;
  value: number | string | null;
  onChange: (value: number | null) => void;
}

export interface MultivalueNumberFilterProps {
  id: string;
  label: React.ReactNode | React.ComponentType;
  value: number[] | null;
  onChange: (value: number[]) => void;
}

export const NumberFilter = (props: NumberFilterProps) => {
  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id={props.id}>
        <Label content={props.label} />
      </InputLabel>
      <Input id={props.id}
        type="number"
        value={props.value}
        onChange={(e) => {
          if (e.target.value === '') {
            props.onChange(null);
          } else {
            props.onChange(parseFloat(e.target.value));
          }
        }}
      />
    </FormControl>
  );
}

export const MultivalueNumberFilter = (props: MultivalueNumberFilterProps) => {
  const [values, setValues] = useState<Array<number>>(props.value ?? []);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      if (values.find((value) => value === parseFloat(inputValue))) {
        setInputValue('');
        return;
      }

      setValues((prevValues) => {
        const newValues = [...prevValues, parseFloat(inputValue)]
        props.onChange(newValues);
        return newValues;
      });
      setInputValue('');
    }
  };

  const handleDelete = (valueToDelete: number) => () => {
    setValues(prevValues => {
      const newValues = prevValues.filter((value) => value !== valueToDelete);
      props.onChange(newValues);
      return newValues;
    });
  };

  return (
    <>
      <TextField
        label={<Label content={props.label} />}
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
      <input id={props.id} type="hidden" value={values.map(e => e.toString())} />
    </>
  );
};
