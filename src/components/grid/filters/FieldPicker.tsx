import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "../../utils/Label";

export interface FieldPickerProps {
  selectedField: string;
  fields: { id: string, name: React.ReactNode | React.ComponentType }[];
  onChange: (field: string) => void;
}

export const FieldPicker = ({ selectedField, fields, onChange }: FieldPickerProps) => {
  const [state, setState] = useState<string>(selectedField);
  const { t } = useTranslation("translation", { keyPrefix: "components.grid" });

  const handleChange = (field: string) => {
    setState(field);
    onChange(field);
  };

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id="field-selector-label">
        {t("filters.field")}
      </InputLabel>
      <Select id="field-selector"
        labelId="field-selector-label"
        value={selectedField}
        onChange={(e) => handleChange(e.target.value as string)}
        label={t("filters.field")}
      >
        {
          fields.map(field => (
            <MenuItem key={field.id} value={field.id}>
              <Label content={field.name} />
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

