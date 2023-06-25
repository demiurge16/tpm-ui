import { Add, Clear } from '@mui/icons-material';
import { Box, Button,  Grid, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
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
import { Filter, FilterOperator, FilterValue } from '../../client/types/common/Search';
import { Field } from './Field';

export function QueryBuilder(props: QueryBuilderProps) {
  const { initialState, filters, onQueryChange } = props;

  const [state, setState] = useState<Filter[]>(
    initialState == null || initialState.length === 0 ? [
      {
        field: filters[0].id,
        operator: filters[0].getDefaultOperation().symbol,
        value: filters[0].getDefaultValue()
      }
    ] : initialState
  );

  useEffect(() => {
    if (state.every(isFilterValid)) {
      onQueryChange(state);
    }
  }, [state]);

  const isFilterValid = (filter: Filter) => {
    if (filter.operator === Operation.IS_NULL.symbol || filter.operator === Operation.IS_EMPTY.symbol) {
      return filter.value === "";
    }

    return filter.value !== "";
  }

  const getColumnDefinition = (id: string) => filters.find(qd => qd.id === id);

  const updateFilterField = (index: number, field: string) => {
    setState(prevState => {
      const newState = [...prevState];
      newState[index] = {
        field: field,
        operator: getColumnDefinition(field)?.getDefaultOperation().symbol ?? Operation.EQUALS.symbol,
        value: getColumnDefinition(field)?.getDefaultValue() ?? ""
      };
      return newState;
    });
  };
  
  const updateFilterOperator = (index: number, operator: FilterOperator) => {
    setState(prevState => {
      const newState = [...prevState];
      if (operator === Operation.IS_NULL.symbol || operator === Operation.IS_EMPTY.symbol) {
        newState[index] = {
          field: newState[index].field,
          operator: operator,
          value: ""
        };
      } else {
        newState[index] = {
          field: newState[index].field,
          operator: operator,
          value: getColumnDefinition(newState[index].field)?.getDefaultValue() ?? ""
        };
      }
      return newState;
    });
  };
  
  const updateFilterValue = (index: number, value: FilterValue) => {
    setState(prevState => {
      const newState = [...prevState];
      newState[index] = {
        field: newState[index].field,
        operator: newState[index].operator,
        value: value
      };
      return newState;
    });
  };

  const addFilter = () => {
    const newState = [...state];
    const newFilterDefinition = filters[0];

    newFilterDefinition && newState.push({
      field: newFilterDefinition.id,
      operator: getColumnDefinition(newFilterDefinition.id)?.getDefaultOperation().symbol ?? Operation.EQUALS.symbol,
      value: getColumnDefinition(newFilterDefinition.id)?.getDefaultValue() ?? ""
    });

    setState(newState);
  };

  const clearFilters = () => {
    setState(
      [
        {
          field: filters[0].id,
          operator: filters[0].getDefaultOperation().symbol,
          value: filters[0].getDefaultValue()
        }
      ]
    );
  };

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={3} padding={1} width={828}>
      <Grid item xs={12} key={"filters"}>
        {
          state.map((filter, index) => (
            <Box mb={1}>
              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={3} key={index}>
                <Grid item xs={1} mt={1}>
                  <IconButton
                    aria-label="remove filter"
                    disabled={state.length === 1}
                    onClick={() => setState(state.filter((f, i) => i !== index))}
                    edge="end"
                  >
                    <Clear />
                  </IconButton>
                </Grid>
                <Grid item xs={3} ml={-3}>
                  <FieldPicker
                    selectedField={filter.field}
                    fields={filters.map(e => ({ id: e.id, name: e.name }))}
                    onChange={(e) => updateFilterField(index, e)}
                  />
                </Grid>
                {
                  filter.field && (
                    <Grid item xs={3}>
                      <OperatorPicker
                        selectedOperator={filter.operator}
                        operations={getColumnDefinition(filter.field)?.type.operations ?? []}
                        onChange={(e) => updateFilterOperator(index, e.symbol)}
                      />
                    </Grid>
                  )
                }
                {
                  filter.operator !== Operation.IS_NULL.symbol && filter.operator !== Operation.IS_EMPTY.symbol && (
                    <Grid item xs={5}>
                      <FilterInput id="value-selector"
                        label="Value"
                        type={getColumnDefinition(filter.field)?.type ?? Field.STRING}
                        value={filter.value}
                        options={getColumnDefinition(filter.field)?.getOptions() ?? []}
                        valueChanged={(e) => updateFilterValue(index, e)}  
                      />
                    </Grid>
                  )
                }
              </Grid>
            </Box>
          ))
        }
        
      </Grid>
      <Grid item xs={12} key={"actions"}>
        <Box mb={2}>
          <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={3}>
            <Grid item xs={6}>
            <Button fullWidth
              variant="text"
              color="primary"
              size="small"
              startIcon={<Add />}
              onClick={() => addFilter()}
            >
              Add Filter
            </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth
                variant="text"
                color="secondary"
                size="small"
                startIcon={<Clear />}
                onClick={() => clearFilters()}
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

interface FilterProps {
  id: string;
  label: string;
  type: Field;
  value: FilterValue;
  options?: { value: string, label: string }[];
  valueChanged: (value: FilterValue) => void;
}

const FilterInput = (props: FilterProps) => {
  const { id, label, type, value, options, valueChanged } = props;
  const [state, setState] = useState<FilterValue>(value);

  const updateFilter = (value: FilterValue) => {
    setState(value);
    valueChanged(value);
  };

  switch (type.type) {
    case Field.STRING.type:
      return (
        <StringFilter id={id}
          label={label}
          value={value as string}
          onChange={(e) => updateFilter(e)}
        />
      );
    case Field.NUMBER.type:
      return (
        <NumberFilter id={id}
          label={label}
          value={value as number}
          onChange={(e) => updateFilter(e ?? "")}
        />
      );
    case Field.DATE.type:
      return (
        <DateFilter id={id}
          label={label}
          value={value as Date}
          onChange={(e) => updateFilter(e ?? "")}
        />
      );
    case Field.DATETIME.type:
      return (
        <DateTimeFilter id={id}
          label={label}
          value={value as Date}
          onChange={(e) => updateFilter(e ?? "")}
        />
      );
    case Field.BOOLEAN.type:
      return (
        <BooleanFilter id={id}
          label={label}
          value={value as boolean}
          onChange={(e) => updateFilter(e ?? "")}
        />
      );
    case Field.SELECT.type:
      return (
        <MultiselectFilter id={id}
          label={label}
          value={value as string[]}
          onChange={(e) => updateFilter(e ?? [])}
          options={options ?? []}
        />
      );
    default:
      return (
        <StringFilter id={id}
          label={label}
          value={value as string}
          onChange={(e) => updateFilter(e)}
        />
      );
  }
}