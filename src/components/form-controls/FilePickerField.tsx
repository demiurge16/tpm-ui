import React, { useRef } from "react";
import { AttachFile } from "@mui/icons-material";
import { Chip, FormControl, FormHelperText, IconButton, TextField, Typography } from "@mui/material";
import { useField } from "react-final-form";

export interface FilePickerFieldProps {
  name: string;
  label: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
}

export const FilePickerField: React.FC<FilePickerFieldProps> = ({
  name,
  label,
  required,
  accept,
  multiple,
  disabled
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { input, meta } = useField(name);

  const [files, setFiles] = React.useState<FileList | null>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    input.onChange(files);
    setFiles(files);
  };

  const forEachFile = (fileList: FileList, callback: (file: File, index: number) => React.ReactNode) => {
    const result: React.ReactNode[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      result.push(callback(file, i));
    }

    return result;
  }

  const handleDeleteFile = (index: number) => {
    if (files && files.length > 0) {
      const remainingFiles = [];
      for (let i = 0; i < files.length; i++) {
        if (i !== index) {
          remainingFiles.push(files[i]);
        }
      }
      const updatedFiles = new DataTransfer();
      for (const file of remainingFiles) {
        updatedFiles.items.add(file);
      }
      setFiles(updatedFiles.files);
    }
  }

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <TextField
        label={label}
        required={required}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <>
              {
                files && files.length > 0 ? (
                  forEachFile(files, (file, index) => (
                    <Chip key={file.name}
                      label={file.name}
                      onDelete={() => handleDeleteFile(index)}
                      sx={{ mr: 1 }}
                    />
                  ))
                ) : (
                  <Typography variant="body1" noWrap>No files selected</Typography>
                )
              }
            </>
          ),
          endAdornment: (
            <>
              <IconButton component="span" disabled={disabled} onClick={handleSelectFile}>
                <AttachFile />
                <Typography variant="body1" noWrap>Select file</Typography>
              </IconButton>
            </>
          )
        }}
      />
      <FormHelperText>{meta.touched && meta.error}</FormHelperText>
      <input ref={fileInputRef}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </FormControl>
  );
}