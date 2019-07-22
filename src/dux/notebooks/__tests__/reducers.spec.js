import reducer from '../reducers';
import {
  GET_NOTEBOOKS,
  GET_NOTEBOOKS_SUCCESS,
  GET_NOTEBOOKS_FAILURE,
} from '../actionTypes';
import initialState from '../initialState';

describe('Dux/Notebooks/Reducers', () => {
  it('should set initialstate', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should set loading on GET_NOTEBOOKS', () => {
    expect(
      reducer(initialState, { type: GET_NOTEBOOKS }).get('notebooksLoading')
    ).toEqual(true);
  });
  it('should set loading on GET_NOTEBOOKS_FAILURE', () => {
    expect(
      reducer(initialState, { type: GET_NOTEBOOKS_FAILURE }).get('notebooksLoading')
    ).toEqual(true);
  });
  it('should set loading false on GET_NOTEBOOKS_SUCCESS', () => {
    expect(
      reducer(initialState, { type: GET_NOTEBOOKS_SUCCESS }).get('notebooksLoading')
    ).toEqual(false);
  });
});
