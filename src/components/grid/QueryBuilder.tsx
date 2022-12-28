import { useState } from 'react';
import { Operator } from './Operator';
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

  return (
    <div>
      <div>
        <span>Page: </span>
        <div className="input-group">
          <button type="button" className="btn btn-outline-secondary" onClick={() => setState({ ...state, page: state.page - 1 })}>Previous</button>
          <input className="form-control" type="number" value={state.page} onChange={(e) => setState({ ...state, page: parseInt(e.target.value) })} />
          <button type="button" className="btn btn-outline-secondary" onClick={() => setState({ ...state, page: state.page + 1 })}>Next</button>
        </div>
        
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
      <div>
        <span>Filters: </span>
        {
          state.filters.map((filter, index) => (
            <div className="input-group" key={index}> 
              <select className="form-control" value={filter.field} onChange={(e) => setState({ ...state, filters: state.filters.map((f, i) => i === index ? { ...f, field: e.target.value } : f) })}>
                {
                  props.queryDefinitions.filter(e => e.filter).map(field => (
                    <option key={field.id} value={field.id}>{field.name}</option>
                  ))
                }
              </select>
              <select className="form-control" value={filter.operator} onChange={(e) => setState({ ...state, filters: state.filters.map((f, i) => i === index ? { ...f, operator: e.target.value as Operator } : f) })}>
                <option value={Operator.EQUALS}>Equals</option>
                <option value={Operator.CONTAINS}>Contains</option>
                <option value={Operator.GREATER_THAN}>Greater Than</option>
                <option value={Operator.LESS_THAN}>Less Than</option>
                <option value={Operator.GREATER_THAN_OR_EQUAL}>Greater Than Or Equal</option>
                <option value={Operator.LESS_THAN_OR_EQUAL}>Less Than Or Equal</option>
                <option value={Operator.IN}>In</option>
                <option value={Operator.NOT_IN}>Not In</option>
                <option value={Operator.IS_NULL}>Is Null</option>
                <option value={Operator.IS_NOT_NULL}>Is Not Null</option>
                <option value={Operator.IS_EMPTY}>Is Empty</option>
                <option value={Operator.IS_NOT_EMPTY}>Is Not Empty</option>
              </select>
            
              <input type="text" className="form-control" value={filter.value} onChange={(e) => setState({ ...state, filters: state.filters.map((f, i) => i === index ? { ...f, value: e.target.value } : f) })} />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setState({ ...state, filters: state.filters.filter((f, i) => i !== index) })}>Remove</button>
            </div>
          ))
        }
        <div>
          <button className="btn btn-outline-secondary" type="button" onClick={() => setState({ ...state, filters: [...state.filters, { field: 'code', value: '', operator: Operator.EQUALS }] })}>Add Filter</button>
        </div>
      </div>
      <div>
        <button className="btn btn-outline-secondary" type="button" onClick={() => props.onQueryChange(state)}>Save and apply</button>
        <button className="btn btn-outline-secondary" type="button" onClick={() => setState({ page: 0, pageSize: 25, sort: '', direction: SortDirection.ASC, filters: [] })}>Reset</button>
      </div>
    </div>
  );
}
