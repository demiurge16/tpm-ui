import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { SortDirection } from "../SortDirection";

export interface SortPickerProps {
  sort: string;
  direction: SortDirection;
  columns: { id: string, name: string }[];
  onChange: (sort: string, direction: SortDirection) => void;
}

export const SortPicker = (props: SortPickerProps) => {
  const [sort, direction, columns, onChange] = [props.sort, props.direction, props.columns, props.onChange];

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={3}>
      <Grid item xs={8}>
        <FormControl variant="outlined" size='small' fullWidth>
          <InputLabel htmlFor="sort-selector">Sort</InputLabel>
          <Select
            labelId="sort-selector"
            id="sort-selector"
            value={sort}
            onChange={(e) => onChange(e.target.value as string, direction)}
            label="Sort"
          >
            <MenuItem key="" value="">None</MenuItem>
            {
              columns.map(field => (
                <MenuItem key={field.id} value={field.id}>{field.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
      {
        sort && (
          <Grid item xs={4}>
            <FormControl variant="outlined" size='small' fullWidth>
              <InputLabel htmlFor="direction-selector">Direction</InputLabel>
              <Select
                labelId="direction-selector"
                id="direction-selector"
                value={direction}
                onChange={(e) => onChange(sort, e.target.value as SortDirection)}
                label="Direction"
              >
                <MenuItem value={SortDirection.ASC}>Ascending</MenuItem>
                <MenuItem value={SortDirection.DESC}>Descending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )
      }
    </Grid>
  );
}