import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, Typography } from "@mui/material";

export interface SelectFilterProps {
  id: string;
  label: string | React.ComponentType<object>;
  value: string | string[];
  multiple?: boolean;
  options: { value: string, label: string | React.ComponentType<object> }[];
  onChange: (value: string | string[]) => void;
}

export const SelectFilter = (props: SelectFilterProps) => {
  const labelId = `${props.id}-label`;

  const renderValue = (values: string | string[]) => {
    if (!props.multiple) {
      const Label = props.options.find(e => e.value == values)?.label;

      if (!Label) {
        return null;
      }

      return typeof Label === "string" ? Label : <Label />;
    }
    return (values as string[]).map(v => {
      const Label = props.options.find(e => e.value == v)?.label;
      
      if (!Label) {
        return null;
      }

      return typeof Label === "string" ? Label : <Label />;
    })
    .filter(e => e != null)
    .join(', ');
  }

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id={labelId}>
        {typeof props.label === "string" ? props.label : <props.label />}
      </InputLabel>
      <Select id={props.id}
        labelId={labelId}
        label={typeof props.label === "string" ? props.label : <props.label />}
        value={props.value}
        multiple={props.multiple ?? false}
        onChange={(e) => { 
          props.onChange(e.target.value);
        }}

        renderValue={(selected) => (
          <Typography variant="body1">{renderValue(selected)}</Typography>
        )}
      >
        {
          props.options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={!!props.value && props.value.indexOf(option.value) > -1} />
              <ListItemText primary={typeof option.label === "string" ? option.label : <option.label />} />
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
