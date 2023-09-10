import { Field } from "react-final-form";
import { Editor } from "../editor/Editor";
import { FormControl, FormHelperText } from "@mui/material";

export interface EditorInputProps {
  name: string;
  label: string;
  required?: boolean;
}

export const EditorField = (props: EditorInputProps) => {
  const { name, label, required } = props;

  return <Field name={name}>
    {({ input, meta }) => (
      <FormControl
        fullWidth
        margin="normal"
        variant="outlined"
        error={meta.error && meta.touched}
        required={required}
      >
        <Editor
          onChange={(content: string, editor: any) => {
            input.onChange(content);
          }}
        />
        <FormHelperText>{meta.error && meta.touched && meta.error}</FormHelperText>
      </FormControl>
    )}
  </Field>
}