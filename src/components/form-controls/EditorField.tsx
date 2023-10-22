import { Field } from "react-final-form";
import { Editor } from "../editor/Editor";
import { FormControl, FormHelperText } from "@mui/material";

export interface EditorInputProps {
  name: string;
  required?: boolean;
}

export const EditorField = (props: EditorInputProps) => {
  const { name, required } = props;

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
        <FormHelperText>
          {(meta.touched && meta.error) || meta.submitError}
        </FormHelperText>
      </FormControl>
    )}
  </Field>
}