import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface BooleanFilterProps {
  id: string;
  label: string | React.ComponentType<object>;
  value: boolean | string | null;
  onChange: (value: boolean) => void;
}

export const BooleanFilter = (props: BooleanFilterProps) => {
  const { t } = useTranslation("translation", { keyPrefix: "components.grid" });
  const labelId = `${props.id}-label`;
  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id={labelId}>        
        {typeof props.label === "string" ? props.label : <props.label />}
      </InputLabel>
      <Select id={props.id}
        labelId={labelId}
        value={props.value}
        label={typeof props.label === "string" ? props.label : <props.label />}
        onChange={(e) => props.onChange(e.target.value as boolean)}
      >
        <MenuItem value="true">
          {t("filters.boolean.true")}
        </MenuItem>
        <MenuItem value="false">
          {t("filters.boolean.false")}
        </MenuItem>
      </Select>
    </FormControl>
  )
}
