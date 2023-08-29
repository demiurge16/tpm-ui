import { Field } from "react-final-form";
import { Editor } from "../editor/Editor";
import { FormControl, FormHelperText, InputBase } from "@mui/material";

export interface EditorInputProps {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
}

export const EditorField = (props: EditorInputProps) => {
  const { name, label, required, defaultValue } = props;

  return <Field name={name} defaultValue={defaultValue}>
    {({ input, meta }) => (
      <FormControl
        fullWidth
        margin="normal"
        variant="outlined"
        error={meta.error && meta.touched}
        required={required}
      >
        <Editor
          initialContent={defaultValue}
          onChange={(content: string, editor: any) => {
            input.onChange(content);
          }}
        />
        <FormHelperText>{meta.error && meta.touched && meta.error}</FormHelperText>
      </FormControl>
    )}
  </Field>
}