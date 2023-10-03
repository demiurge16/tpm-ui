import { Add, Clear } from '@mui/icons-material';
import { Box, Button,  Grid, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { BooleanFilter } from './filters/BooleanFilter';
import { DateFilter, MultivalueDateFilter } from './filters/DateFilter';
import { DateTimeFilter, MultivalueDateTimeFilter } from './filters/DateTimeFilter';
import { FieldPicker } from './filters/FieldPicker';
import { SelectFilter } from './filters/SelectFilter';
import { MultivalueNumberFilter, NumberFilter } from './filters/NumberFilter';
import { OperatorPicker } from './filters/OperationPicker';
import { MultivalueStringFilter, StringFilter } from './filters/StringFilter';
import { QueryBuilderProps } from './QueryBuilderProps';
import { Operation } from './Operation';
import { Filter, FilterOperator, FilterValue } from '../../client/types/common/Search';
import { Field } from './Field';
import { FieldType } from './FieldType';
import { useTranslation } from 'react-i18next';

const getDefaultValue = (type: FieldType, multivalue: boolean): FilterValue | null => {
  switch (type) {
    case FieldType.UNIQUE_TOKEN:
    case FieldType.STRING:
    case FieldType.NUMBER:
    case FieldType.DATE:
    case FieldType.DATETIME:
      return multivalue ? [] : null;
    case FieldType.BOOLEAN:
      return false;
    case FieldType.SELECT:
      return multivalue ? [] : null;
    case FieldType.MULTISELECT:
      return [];
    default:
      throw new Error(`Unknown field type: ${type}`);
  }
}

export function QueryBuilder(props: QueryBuilderProps) {
  const { initialState, filters, onQueryChange } = props;
  const { t } = useTranslation("translation", { keyPrefix: "components.grid" });

  const [state, setState] = useState<Filter[]>(
    initialState == null || initialState.length === 0 ? [
      {
        field: filters[0].id,
        operator: filters[0].getDefaultOperation().symbol,
        value: null
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
      return filter.value === null;
    }

    if (filter.value instanceof Array) {
      return filter.value !== null && filter.value.length > 0;
    }

    return filter.value !== null;
  }

  const getColumnDefinition = (id: string) => filters.find(qd => qd.id === id);

  const updateFilterField = (index: number, field: string) => {
    setState(prevState => {
      const newState = [...prevState];
      newState[index] = {
        field: field,
        operator: getColumnDefinition(field)?.getDefaultOperation().symbol ?? Operation.EQUALS.symbol,
        value: null
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
          value: getDefaultValue(filters[0].type.type, filters[0].getDefaultOperation().multivalue)
        };
      }
      return newState;
    });
  };
  
  const updateFilterValue = (index: number, value: FilterValue | null) => {
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
      value: null
    });

    setState(newState);
  };

  const clearFilters = () => {
    setState(
      [
        {
          field: filters[0].id,
          operator: filters[0].getDefaultOperation().symbol,
          value: null
        }
      ]
    );
    onQueryChange([]);
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
                        type={getColumnDefinition(filter.field)?.type.type ?? Field.UNIQUE_TOKEN.type}
                        multiple={Operation.getOperationForSymbol(filter.operator)?.multivalue ?? false}
                        value={filter.value ?? getDefaultValue(getColumnDefinition(filter.field)?.type.type ?? Field.UNIQUE_TOKEN.type, Operation.getOperationForSymbol(filter.operator)?.multivalue ?? false)}
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
              {t("filters.addFilter")}
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
                {t("filters.clear")}
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
  label: string | React.ComponentType<object>;
  type: FieldType;
  multiple: boolean;
  value: FilterValue | null;
  options?: { value: string, label: string | React.ComponentType<object> }[];
  valueChanged: (value: FilterValue | null) => void;
}

const FilterInput = (props: FilterProps) => {
  const { id, label, type, multiple, value, options, valueChanged } = props;
  const [state, setState] = useState<FilterValue | null>(value);

  const updateFilter = (value: FilterValue | null) => {
    setState(value);
    valueChanged(value);
  };

  switch (type) {
    case Field.UNIQUE_TOKEN.type:
      if (multiple) {
        return (
          <MultivalueStringFilter id={id}
            label={label}
            value={value as string[]}
            onChange={(e) => updateFilter(e ?? [])}
          />
        );
      } else {
        return (
          <StringFilter id={id}
            label={label}
            value={value as string}
            onChange={(e) => updateFilter(e)}
          />
        );
      }
    case Field.STRING.type:
      if (multiple) {
        return (
          <MultivalueStringFilter id={id}
            label={label}
            value={value as string[]}
            onChange={(e) => updateFilter(e ?? [])}
          />
        );
      } else {
        return (
          <StringFilter id={id}
            label={label}
            value={value as string}
            onChange={(e) => updateFilter(e)}
          />
        );
      }
    case Field.NUMBER.type:
      if (multiple) {
        return (
          <MultivalueNumberFilter id={id}
            label={label}
            value={value as number[]}
            onChange={(e) => updateFilter(e ?? [])}
          />
        );
      } else {
        return (
          <NumberFilter id={id}
            label={label}
            value={value as number}
            onChange={(e) => updateFilter(e ?? null)}
          />
        );
      }
    case Field.DATE.type:
      if (multiple) {
        return (
          <MultivalueDateFilter id={id}
            label={label}
            value={value as Date[]}
            onChange={(e) => updateFilter(e ?? [])}
          />
        );
      } else {
        return (
          <DateFilter id={id}
            label={label}
            value={value as Date}
            onChange={(e) => updateFilter(e ?? "")}
          />
        );
      }
    case Field.DATETIME.type:
      if (multiple) {
        return (
          <MultivalueDateTimeFilter id={id}
            label={label}
            value={value as Date[]}
            onChange={(e) => updateFilter(e ?? [])}
          />
        );
      } else {
        return (
          <DateTimeFilter id={id}
            label={label}
            value={value as Date}
            onChange={(e) => updateFilter(e ?? "")}
          />
        );
      }
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
        <SelectFilter id={id}
          label={label}
          value={value as string[]}
          onChange={(e) => updateFilter(e ?? [])}
          options={options ?? []}
          multiple={multiple}
        />
      );
    case Field.MULTISELECT.type:
      return (
        <SelectFilter id={id}
          label={label}
          value={value as string[]}
          onChange={(e) => updateFilter(e ?? [])}
          options={options ?? []}
          multiple
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