import { useContext, useEffect, useState, useRef } from "react";
import { Page } from "../../client/types/common/Page";
import { Autocomplete, CircularProgress, FormControl, TextField } from "@mui/material";
import { Observable, Subject, debounceTime, switchMap, tap } from "rxjs";
import { Field } from "react-final-form";
import { SnackbarContext } from "../../contexts/SnackbarContext";

type Option = {
  key: string;
  value: string;
};

type OptionsLoader = (searchTerm: string) => Observable<Page<Option>>;

export interface AsyncSelectFieldProps {
  name: string;
  label: string;
  multiple?: boolean;
  required?: boolean;
  defaultValue?: [];
  optionsLoader: OptionsLoader;
}

export const AsyncSelectField = (props: AsyncSelectFieldProps) => {
  const { name, label, multiple, required, defaultValue, optionsLoader } = props;
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);

  const snackbarContext = useContext(SnackbarContext);

  const searchSubject = useRef(new Subject<string>());

  useEffect(() => {
    const subscription = searchSubject.current
      .pipe(
        debounceTime(300),
        switchMap((search: string) => optionsLoader(search))
      )
      .subscribe({
        next: (response) => {
          setOptions(response.items);
          setLoading(false);
        },
        error: (error) => {
          snackbarContext.showError("Error", error.message);
          setLoading(false);
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [optionsLoader]);

  useEffect(() => {
    searchSubject.current.next("");
  }, [searchSubject]);

  return (
    <Field name={name} defaultValue={defaultValue}>
      {({ input, meta }) => (
        <FormControl 
          variant="outlined"
          fullWidth
          margin="normal"
        >
          <Autocomplete
            multiple={multiple}
            loading={loading}
            options={options}
            getOptionLabel={(option) => option.value}
            onChange={(event, value) => {
              if (value instanceof Array) {
                input.onChange(value.map((item) => item.key));
              } else if (value) {
                input.onChange(value.key);
              } else {
                input.onChange(null);
              }
              
              setLoading(false);
              return;
            }}
            onInputChange={(event, value) => {
              setLoading(true);
              searchSubject.current.next(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="outlined"
                required={required}
                error={meta.error && meta.touched}
                helperText={meta.touched && meta.error}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
              />
            )}
          />
        </FormControl>
      )}
    </Field>
  );
}
