import { ArrowBackIos, ArrowForwardIos, RemoveCircle, AddCircle, Search, Clear } from '@mui/icons-material';
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { FieldType } from './FieldType';
import { BooleanFilter } from './filters/BooleanFilter';
import { DateFilter } from './filters/DateFilter';
import { DateTimeFilter } from './filters/DateTimeFilter';
import { FieldPicker } from './filters/FieldPicker';
import { MultiselectFilter } from './filters/MultiselectFilter';
import { NumberFilter } from './filters/NumberFilter';
import { OperatorPicker } from './filters/OperationPicker';
import { SortPicker } from './filters/SortPicker';
import { StringFilter } from './filters/StringFilter';
import { Operation } from './Operation';
import { PageSizeOptions } from './PageSizeOptions';
import { Query } from './Query';
import { QueryBuilderProps } from './QueryBuilderProps';
import { SortDirection } from './SortDirection';

export function QueryBuilder<Type>(props: QueryBuilderProps<Type>) {

  const initialQuery: Query = {
    page: 0,
    pageSize: 25,
    sort: '',
    direction: SortDirection.ASC,
    filters: []
  };

  const [state, setState] = useState<Query>(initialQuery);

  useEffect(() => {
    props.onQueryChange(state);
  }, [state.page, state.pageSize, state.sort, state.direction]);

  const previousPage = () => setState({ ...state, page: state.page - 1 });

  const nextPage = () => setState({ ...state, page: state.page + 1 });

  const setPage = (page: number) => setState({ ...state, page });


  const getColumnDefinition = (id: string | null) => props.queryDefinitions.find(qd => qd.id === id);

  const getColumnDefinitionType = (id: string | null) => getColumnDefinition(id)?.type.type;

  const isStringColumn = (id: string | null) => getColumnDefinitionType(id) === FieldType.STRING;

  const isNumberColumn = (id: string | null) => getColumnDefinitionType(id) === FieldType.NUMBER;

  const isDateColumn = (id: string | null) => getColumnDefinitionType(id) === FieldType.DATE;

  const isDateTimeColumn = (id: string | null) => getColumnDefinitionType(id) === FieldType.DATETIME;

  const isBooleanColumn = (id: string | null) => getColumnDefinitionType(id) === FieldType.BOOLEAN;

  const isSelectColumn = (id: string | null) => getColumnDefinitionType(id) === FieldType.SELECT;

  const getColumnDefinitionOptions = (id: string | null) => getColumnDefinition(id)?.options ?? [];

  const getColumnDefinitionOperators = (id: string | null) => getColumnDefinition(id)?.type.operations ?? [];

  const getDefaultFilterOperator = (id: string | null) => getColumnDefinitionOperators(id)[0];

  const getDefaultFilterValue = (id: string | null) => isSelectColumn(id) ? [] : '';

  const updateFilterField = (index: number, field: string) => {
    const filters = [...state.filters];
    filters[index].field = field;
    filters[index].operator = getDefaultFilterOperator(field).symbol;
    filters[index].value = getDefaultFilterValue(field);
    setState({ ...state, filters });
  };

  const updateFilterOperator = (index: number, operator: string) => {
    const filters = [...state.filters];
    filters[index].operator = operator;
    setState({ ...state, filters });
  };

  const updateFilterValue = (index: number, value: string | string[] | null) => {
    const filters = [...state.filters];
    filters[index].value = value;
    setState({ ...state, filters });
  }

  const addFilter = () => {
    const filters = [...state.filters];
    const newFilterDefinition = props.queryDefinitions[0];

    newFilterDefinition && filters.push({
      field: newFilterDefinition.id,
      operator: getDefaultFilterOperator(newFilterDefinition.id).symbol,
      value: getDefaultFilterValue(newFilterDefinition.id)
    });

    setState({ ...state, filters });
  };

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={3}>
      <Grid item xs={6}>
        <Box>
          <FormControl variant="outlined" size='small' fullWidth>
            <InputLabel htmlFor="page-selector">Page</InputLabel>
            <OutlinedInput id="page-selector"
              type="number"
              value={state.page + 1}
              label="Page"
              disabled
              startAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label="previous page"
                    disabled={state.page === 0}
                    onClick={() => previousPage()}
                    edge="start"
                  >
                    <ArrowBackIos />
                  </IconButton>
                </InputAdornment>
              }

              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="next page"
                    onClick={() => nextPage()}
                    edge="end"
                  >
                    <ArrowForwardIos />
                  </IconButton>
                </InputAdornment>
              }

              onChange={(e) => setPage(parseInt(e.target.value as string) - 1)}
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box pl={2} pr={2}>
          <FormControl variant="outlined" size='small' fullWidth>
            <InputLabel htmlFor="page-size-selector">Page Size</InputLabel>
            <Select
              labelId="page-size-selector"
              id="page-size-selector"
              value={state.pageSize}
              onChange={(e) => setState({ ...state, page: 0, pageSize: parseInt(e.target.value as string) })}
              label="Page Size"
            >
              {
                Object.keys(PageSizeOptions).map(key => (
                  <MenuItem key={key} value={PageSizeOptions[key].value}>{PageSizeOptions[key].label}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box>
          <SortPicker
            sort={state.sort}
            direction={state.direction}
            columns={props.queryDefinitions.map(e => ({ id: e.id, name: e.name }))}
            onChange={(sort, direction) => setState({ ...state, sort, direction })}
          />
        </Box>
      </Grid>

      <Grid item xs={6} />

      <Grid item xs={6}>
        <Box mb={2}>
          <Typography variant="h6">Filters</Typography>
        </Box>
        {
          state.filters.map((filter, index) => (
            <Box mb={2}>
              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={3} key={index}>
                <Grid item xs={3}>
                  <FieldPicker
                    fields={props.queryDefinitions.map(e => ({ id: e.id, name: e.name }))}
                    onChange={(e) => updateFilterField(index, e)}
                  />
                </Grid>
                {
                  filter.field && (
                    <Grid item xs={3}>
                      <OperatorPicker
                        value={filter.operator}
                        operations={getColumnDefinitionOperators(filter.field)}
                        onChange={(e) => updateFilterOperator(index, e.symbol)}
                      />
                    </Grid>
                  )
                }
                {
                  filter.operator !== Operation.IS_NULL.symbol && filter.operator !== Operation.IS_EMPTY.symbol && (

                    <Grid item xs={5}>
                      {
                        isStringColumn(filter.field) && (
                          <StringFilter id="value-selector"
                            label="Value"
                            value={filter.value as string}
                            onChange={(e) => updateFilterValue(index, e?.toString() ?? "")}
                          />
                        )

                        ||

                        isNumberColumn(filter.field) && (
                          <NumberFilter id="value-selector"
                            label="Value"
                            value={filter.value as string}
                            onChange={(e) => updateFilterValue(index, e?.toString() ?? "")}
                          />
                        )

                        ||

                        isDateColumn(filter.field) && (
                          <DateFilter id="value-selector"
                            label="Value"
                            value={filter.value as string}
                            onChange={(e) => updateFilterValue(index, e?.toString() ?? "")}
                          />
                        )

                        ||

                        isDateTimeColumn(filter.field) && (
                          <DateTimeFilter id="value-selector"
                            label="Value"
                            value={filter.value as string}
                            onChange={(e) => updateFilterValue(index, e?.toString() ?? "")}
                          />
                        )

                        ||

                        isBooleanColumn(filter.field) && (
                          <BooleanFilter id="value-selector"
                            label="Value"
                            value={filter.value as string}
                            onChange={(e) => updateFilterValue(index, e.toString())}
                          />
                        )

                        ||

                        isSelectColumn(filter.field) && (
                          <MultiselectFilter id="value-selector"
                            label="Value"
                            value={filter.value as string[]}
                            onChange={(e) => updateFilterValue(index, e)}
                            options={getColumnDefinitionOptions(filter.field)}
                          />
                        )
                      }
                    </Grid>
                  )
                }
                <Grid item xs={1}>
                  <IconButton
                    aria-label="remove filter"
                    onClick={() => setState({ ...state, filters: state.filters.filter((f, i) => i !== index) })}
                    edge="end"
                  >
                    <RemoveCircle />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))
        }
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddCircle />}
          onClick={() => addFilter()}
        >
          Add Filter
        </Button>
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={6}>
        <Box mb={2}>
          <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={3}>
            <Grid item xs={6}>
              <Button fullWidth
                variant="contained"
                color="primary"
                size="small"
                startIcon={<Search />}
                onClick={() => props.onQueryChange(state)}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<Clear />}
                onClick={() => setState({ ...initialQuery })}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}


