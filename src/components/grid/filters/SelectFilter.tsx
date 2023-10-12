import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import { Label } from "../../utils/Label";

export interface SelectFilterProps {
  id: string;
  label: React.ReactNode | React.ComponentType;
  value: string | string[];
  multiple?: boolean;
  options: { value: string, label: React.ReactNode | React.ComponentType }[];
  onChange: (value: string | string[]) => void;
}

export const SelectFilter = (props: SelectFilterProps) => {
  const labelId = `${props.id}-label`;

  const renderValue = (values: string | string[]) => {
    if (!props.multiple) {
      const label = props.options.find(e => e.value == values)?.label;
      return <Label content={label} />;
    }
    return (values as string[]).map(v => {
      const label = props.options.find(e => e.value == v)?.label;
      return <Label content={label} />;
    })
    .filter(e => e != null)
    .join(', ');
  }

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id={labelId}>
        <Label content={props.label} />
      </InputLabel>
      <Select id={props.id}
        labelId={labelId}
        label={<Label content={props.label} />}
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
              <ListItemText primary={<Label content={option.label} />} />
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
