import { MouseEvent, useState } from "react";
import { Box, Button, Chip, FormControl, IconButton, InputAdornment, Popover, TextField } from "@mui/material";
import { CalendarIcon, DateTimePicker, StaticDateTimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";

export interface DateTimeFilterProps {
  id: string;
  label: string | React.ComponentType<object>;
  value: Date | null;
  onChange: (value: Date | null) => void;
}

export interface MultivalueDateTimeFilterProps {
  id: string;
  label: string | React.ComponentType<object>;
  value: Date[] | null;
  onChange: (value: Date[]) => void;
}

export const DateTimeFilter = (props: DateTimeFilterProps) => {
  return (
    <FormControl id={props.id} variant="standard" size="small" fullWidth>
      <DateTimePicker
        label={typeof props.label === "string" ? props.label : <props.label />}
        ampm={false}
        value={props.value ? DateTime.fromJSDate(new Date(props.value)) : null}
        onChange={(date) => props.onChange(date?.toJSDate() ?? null)}
        slotProps={{
          textField: {
            variant: "standard",
            size: "small"
          }
        }}
      />
    </FormControl>
  );
}

export const MultivalueDateTimeFilter = (props: MultivalueDateTimeFilterProps) => {
  const [values, setValues] = useState<Array<Date>>(props.value ?? []);
  
  const [pickerValue, setPickerValue] = useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenPicker = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePicker = () => {
    setAnchorEl(null);
  };

  const handlePickerChange = (date: Date | null) => {
    setPickerValue(date);
  };

  const handleCancelPicker = () => {
    setPickerValue(null);
    handleClosePicker();
  };

  const handleOkPicker = () => {
    if (pickerValue) {
      setValues((prevValues) => {
        const newValues = [...prevValues, pickerValue];
        props.onChange(newValues);
        return newValues;
      });
    }
    setPickerValue(null);
    handleClosePicker();
  };

  const handleDelete = (valueToDelete: Date) => () => {
    setValues((prevValues) => {
      const newValues = prevValues.filter((value) => value !== valueToDelete);
      props.onChange(newValues);
      return newValues;
    });
  };

  return (
    <FormControl id={props.id} variant="standard" size="small" fullWidth>
      <TextField
        label={typeof props.label === "string" ? props.label : <props.label />}
        variant="standard"
        value={props.value}
        InputProps={{
          readOnly: true,
          startAdornment: values.map((value, index) => (
            <Chip
              key={index}
              label={value.toString()}
              onDelete={handleDelete(value)}
              style={{ margin: "2px" }}
            />
          )),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleOpenPicker}>
                <CalendarIcon />
              </IconButton>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClosePicker}
              >
                <StaticDateTimePicker
                  orientation="landscape"
                  value={pickerValue}
                  onChange={(date) => handlePickerChange(date)}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={handleCancelPicker}>Cancel</Button>
                  <Button onClick={handleOkPicker}>OK</Button>
                </Box>
              </Popover>
            </InputAdornment>
          )
        }}
      />
    </FormControl>
  );
};
