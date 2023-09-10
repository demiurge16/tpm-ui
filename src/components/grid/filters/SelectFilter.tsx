import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, Typography } from "@mui/material";

export interface SelectFilterProps {
  id: string;
  label: string;
  value: string | string[];
  multiple?: boolean;
  options: { value: string, label: string }[];
  onChange: (value: string | string[]) => void;
}

export const SelectFilter = (props: SelectFilterProps) => {
  const { id, label, value, multiple, options, onChange } = props;
  const labelId = `${id}-label`;

  const renderValue = (values: string | string[]) => {
    if (!multiple) {
      return options.find(e => e.value == values)?.label;
    }
    return (values as string[]).map(v => options.find(e => e.value == v)?.label).join(', ');
  }

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select id={id}
        labelId={labelId}
        label={label}
        value={value}
        multiple={multiple ?? false}
        onChange={(e) => { 
          onChange(e.target.value);
        }}

        renderValue={(selected) => (
          <Typography variant="body1">{renderValue(selected)}</Typography>
        )}
      >
        {
          options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={!!value && value.indexOf(option.value) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
