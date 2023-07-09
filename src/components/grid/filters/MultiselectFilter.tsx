import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, Typography } from "@mui/material";

export interface MultiselectFilterProps {
  id: string;
  label: string;
  value: string[];
  options: { value: string, label: string }[];
  onChange: (value: string[]) => void;
}

export const MultiselectFilter = (props: MultiselectFilterProps) => {
  const [id, label, value, options, onChange] = [props.id, props.label, props.value, props.options, props.onChange];
  const labelId = `${id}-label`;

  const renderValue = (values: string[]) => {
    return values.map(v => options.find(e => e.value == v)?.label).join(', ');
  }

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select id={id}
        labelId={labelId}
        label={label}
        value={value}
        multiple
        onChange={(e) => { 
          onChange(e.target.value as string[]);
        }}

        renderValue={(selected) => (
          <Typography variant="body1">{renderValue(selected)}</Typography>
        )}
      >
        {
          options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={value.indexOf(option.value) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
