import { MouseEvent, useState } from "react";
import { IconButton, Popover, TextField } from "@mui/material";
import { Field } from "react-final-form";
import data from '@emoji-mart/data/sets/14/google.json'
import Picker from '@emoji-mart/react'
import { MoodOutlined } from "@mui/icons-material";

export interface EmojiPickerProps {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
}

export const EmojiPickerField = (props: EmojiPickerProps) => {
  const { name, label, required, defaultValue } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [emoji, setEmoji] = useState<string>("");

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEmojiSelect = (e: any) => {
    e && setEmoji(e.native);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Field name={name} defaultValue={defaultValue}>
      {({ input, meta }) => (
        <TextField
          {...input}
          label={label}
          type="text"
          required={required}
          margin="normal"
          fullWidth
          variant="outlined"
          error={meta.error && meta.touched}
          helperText={meta.error}
          value={emoji}
          InputProps={{
            endAdornment: (
              <>
                <IconButton onClick={handleClick}>
                  <MoodOutlined />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose} 
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Picker data={data} set="google" noCountryFlags={false} onEmojiSelect={handleEmojiSelect} getSpritesheetURL={() => "/emoji-sprites.png"}></Picker>
                </Popover>
              </>
            ),
          }}
        />
      )}
    </Field>
  );
};
