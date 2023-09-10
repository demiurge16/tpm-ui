import { useContext, useEffect, useState, useRef } from "react";
import { Page } from "../../client/types/common/Page";
import { Autocomplete, CircularProgress, FormControl, TextField } from "@mui/material";
import { Observable, Subject, debounceTime, map, switchMap } from "rxjs";
import { Field } from "react-final-form";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { Search } from "../../client/types/common/Search";

type Option = {
  key: string;
  value: string;
};

type OptionsLoader = (search: Search) => Observable<Page<any>>;
type SearchQueryProvider = (searchTerm: string) => Search;
type ResultFormatter = (result: any) => Option;

export interface AsyncSelectFieldProps {
  name: string;
  label: string;
  multiple?: boolean;
  required?: boolean;
  defaultValue?: Option | Option[];
  optionsLoader: OptionsLoader;
  searchQueryProvider: SearchQueryProvider;
  resultFormatter: ResultFormatter;
}

export const AsyncSelectField = (
  { name, label, multiple, required, defaultValue, optionsLoader, searchQueryProvider, resultFormatter }: AsyncSelectFieldProps
) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option[]>(
    defaultValue && defaultValue instanceof Array ? defaultValue : [defaultValue as Option]
  );

  const snackbarContext = useContext(SnackbarContext);

  const searchSubject = useRef(new Subject<string>());

  useEffect(() => {
    const subscription = searchSubject.current
      .pipe(
        debounceTime(300),
        switchMap((search: string) =>
          optionsLoader(searchQueryProvider(search))
            .pipe(
              map((response) => {
                return {
                  items: response.items.map((item) => resultFormatter(item)),
                  currentPage: response.currentPage,
                  totalPages: response.totalPages,
                  totalItems: response.totalItems,
                  hasNextPage: response.hasNextPage,
                  hasPreviousPage: response.hasPreviousPage
                }
              })
            )
        )
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
  }, []);

  return (
    <Field name={name}>
      {({ input, meta }) => {
        return (
          <FormControl 
            variant="outlined"
            fullWidth
            margin="normal"
          >
            <Autocomplete
              defaultValue={
                defaultValue instanceof Array || defaultValue instanceof Object
                  ? defaultValue
                  : null
              }
              multiple={multiple}
              loading={loading}
              options={options}
              getOptionLabel={(option) => option && option.value}
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
                  label={label + (required ? " *" : "")}
                  variant="outlined"
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
              noOptionsText="No options found. Please refine your search term."
            />
          </FormControl>
        )}}
    </Field>
  );
}
