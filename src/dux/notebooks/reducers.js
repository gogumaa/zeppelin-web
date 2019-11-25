import * as fi from 'functional-immutable';
import { handleActions } from 'redux-actions';
import flow from 'lodash/fp/flow';

import initialState from './initialState';
import {
  GET_NOTEBOOKS,
  GET_NOTEBOOKS_SUCCESS,
  GET_NOTEBOOKS_FAILURE,
} from './actionTypes';

export default handleActions({
  [GET_NOTEBOOKS]: fi.set('notebooksLoading', true),
  [GET_NOTEBOOKS_FAILURE]: fi.set('notebooksLoading', true),
  [GET_NOTEBOOKS_SUCCESS]: (state, { payload }) => flow(
    fi.set('notebookList', fi.fromJS(payload)),
    fi.set('notebooksLoading', false),
  )(state),
}, initialState);
