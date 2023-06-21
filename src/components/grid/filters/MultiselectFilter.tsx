import { Box, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";

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

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select id={id}
        labelId={labelId}
        label={label}
        value={value}
        multiple
        onChange={(e) => { 
          console.log(e.target.value);
          onChange(e.target.value as string[]);
        }}

        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={options.find(e => e.value == value)?.label} />
            ))}
          </Box>
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
