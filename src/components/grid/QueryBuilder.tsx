import { RemoveCircle, AddCircle, Search, Clear } from '@mui/icons-material';
import { Box, Button,  Grid, IconButton, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { FieldType } from './FieldType';
import { BooleanFilter } from './filters/BooleanFilter';
import { DateFilter } from './filters/DateFilter';
import { DateTimeFilter } from './filters/DateTimeFilter';
import { FieldPicker } from './filters/FieldPicker';
import { MultiselectFilter } from './filters/MultiselectFilter';
import { NumberFilter } from './filters/NumberFilter';
import { OperatorPicker } from './filters/OperationPicker';
import { StringFilter } from './filters/StringFilter';
import { QueryBuilderProps } from './QueryBuilderProps';
import { Operation } from './Operation';
import { Filter, FilterOperator } from '../../client/types/common/Search';

export function QueryBuilder(props: QueryBuilderProps) {

  const [state, setState] = useState<Filter[]>([]);

  useEffect(() => {
    props.onQueryChange(state);
  }, [state]);

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
    const filters = [...state];
    filters[index].field = field;
    filters[index].operator = getDefaultFilterOperator(field).symbol;
    filters[index].value = getDefaultFilterValue(field);
    setState(filters);
  };

  const updateFilterOperator = (index: number, operator: FilterOperator) => {
    const filters = [...state];
    filters[index].operator = operator;
    setState(filters);
  };

  const updateFilterValue = (index: number, value: string | string[] | undefined) => {
    const filters = [...state];
    filters[index].value = value;
    setState(filters);
  }

  const addFilter = () => {
    const filters = [...state];
    const newFilterDefinition = props.queryDefinitions[0];

    newFilterDefinition && filters.push({
      field: newFilterDefinition.id,
      operator: getDefaultFilterOperator(newFilterDefinition.id).symbol,
      value: getDefaultFilterValue(newFilterDefinition.id)
    });

    setState(filters);
  };

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={3}>
      <Grid item xs={6}>
        <Box mb={2}>
          <Typography variant="h6">Filters</Typography>
        </Box>
        {
          state.map((filter, index) => (
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
                    onClick={() => setState(state.filter((f, i) => i !== index))}
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
                onClick={() => setState([])}
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
