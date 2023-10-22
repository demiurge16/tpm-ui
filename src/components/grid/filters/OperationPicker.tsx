import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Operation } from "../Operation";
import { useTranslation } from "react-i18next";

export interface OperatorPickerProps {
  selectedOperator: string;
  operations: Operation[];
  onChange: (operator: Operation) => void;
}

export const OperatorPicker = ({ selectedOperator, operations, onChange }: OperatorPickerProps) => {
  const { t } = useTranslation("translation", { keyPrefix: "components.grid" });

  const handleChange = (operator: string) => {
    const operation = operations.find(o => o.symbol === operator);
    onChange(operation ?? operations[0]);
  };

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel id="operator-selector-label">
        {t("filters.operator")}
      </InputLabel>
      <Select id="operator-selector"
        labelId="operator-selector-label"
        value={selectedOperator}
        onChange={(e) => handleChange(e.target.value as string)}
        label={t("filters.operator")}
      >
        {
          operations.map(operation => (
            <MenuItem key={operation.symbol} value={operation.symbol}>{t(operation.name)}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}