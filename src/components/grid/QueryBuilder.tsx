import { useState, useEffect } from 'react';
import { Operation } from './Operation';
import { PageSizeOptions } from './PageSizeOptions';
import { Query } from './Query';
import { QueryBuilderProps } from './QueryBuilderProps';
import { SortDirection } from './SortDirection';

export function QueryBuilder<Type>(props: QueryBuilderProps<Type>) {

  const [state, setState] = useState<Query>({
    page: 0,
    pageSize: 25,
    sort: '',
    direction: SortDirection.ASC,
    filters: []
  });

  useEffect(() => {
    props.onQueryChange(state);
  }, [state.page, state.pageSize, state.sort, state.direction]);

  return (
    <div>
      <div className="row col-4 mb-3">
        <div className="col-4">
          <span>Page: </span>
          <div className="input-group">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setState({ ...state, page: state.page - 1 })}>Previous</button>
            <input className="form-control" type="number" value={state.page + 1} onChange={(e) => setState({ ...state, page: parseInt(e.target.value) })} />
            <button type="button" className="btn btn-outline-secondary" onClick={() => setState({ ...state, page: state.page + 1 })}>Next</button>
          </div>
        </div>
        <div className="col-4">
          <span>Page Size: </span>
          <div className="input-group">
            <select className="form-control" value={state.pageSize} onChange={(e) => setState({ ...state, pageSize: parseInt(e.target.value) })}>
              <option value={PageSizeOptions.UNPAGED}>Unpaged</option>
              <option value={PageSizeOptions.TEN}>10</option>
              <option value={PageSizeOptions.TWENTY_FIVE}>25</option>
              <option value={PageSizeOptions.FIFTY}>50</option>
              <option value={PageSizeOptions.HUNDRED}>100</option>
              <option value={PageSizeOptions.TWO_HUNDRED_FIFTY}>250</option>
            </select>
          </div>
          </div>
        <div className="col-4">
          <span>Sort: </span>
          <div className="input-group">
            <select className="form-control" value={state.sort} onChange={(e) => setState({ ...state, sort: e.target.value })}>
              <option value="">None</option>
              {
                props.queryDefinitions.filter(e => e.sortable).map(field => (
                  <option key={field.id} value={field.id}>{field.name}</option>
                ))
              }
            </select>
            {
              state.sort && (
                <select className="form-control" value={state.direction} onChange={(e) => setState({ ...state, direction: e.target.value as SortDirection })}>
                  <option value={SortDirection.ASC}>Ascending</option>
                  <option value={SortDirection.DESC}>Descending</option>
                </select>
              )
            }
          </div>
        </div>
      </div>
      <div className="row col-4 mb-3">
        <span>Filters: </span>
        {
          state.filters.map((filter, index) => (
            <div className="input-group mb-3" key={index}> 
              <select className="form-control" value={filter.field} onChange={(e) => setState({ ...state, filters: state.filters.map((f, i) => i === index ? { ...f, field: e.target.value } : f) })}>
                {
                  props.queryDefinitions.filter(e => e.filter).map(field => (
                    <option key={field.id} value={field.id}>{field.name}</option>
                  ))
                }
              </select>
              <select className="form-control" value={filter.operator} onChange={(e) => setState({ ...state, filters: state.filters.map((f, i) => i === index ? { ...f, operator: e.target.value } : f) })}>
                {
                  props.queryDefinitions.find(e => e.id === filter.field)?.operations?.map(operation => (
                    <option key={operation.symbol} value={operation.symbol}>{operation.name}</option>
                  ))
                }
              </select>

              {
                filter.operator !== Operation.IS_NULL.symbol && filter.operator !== Operation.IS_EMPTY.symbol && (
                  <input type="text" className="form-control" value={filter.value} onChange={(e) => setState({ ...state, filters: state.filters.map((f, i) => i === index ? { ...f, value: e.target.value } : f) })} />
                )
              }
            
              <button type="button" className="btn btn-outline-secondary" onClick={() => setState({ ...state, filters: state.filters.filter((f, i) => i !== index) })}>Remove</button>
            </div>
          ))
        }
        <div>
          <button className="btn btn-outline-secondary" type="button" onClick={() => setState({ ...state, filters: [...state.filters, { field: props.queryDefinitions[0].id, value: '', operator: Operation.EQUALS.symbol }] })}>Add Filter</button>
        </div>
      </div>
      <div className="row col-4 mb-3">
        <div className="col-6">
          <button className="btn btn-outline-secondary w-100" type="button" onClick={() => props.onQueryChange(state)}>Save and apply</button>
        </div>
        <div className="col-6">
          <button className="btn btn-outline-secondary w-100" type="button" onClick={() => setState({ page: 0, pageSize: 25, sort: '', direction: SortDirection.ASC, filters: [] })}>Reset</button>
        </div>
      </div>
    </div>
  );
}
