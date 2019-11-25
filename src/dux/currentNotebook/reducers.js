import * as fi from 'functional-immutable';
import { handleActions } from 'redux-actions';
import flow from 'lodash/fp/flow';

import initialState from './initialState';
import {
  GET_CURRENT_NOTEBOOK,
  GET_CURRENT_NOTEBOOK_SUCCESS,
  GET_CURRENT_NOTEBOOK_FAILURE,
} from './actionTypes';

export default handleActions({
  [GET_CURRENT_NOTEBOOK]: fi.set('notebookLoading', true),
  [GET_CURRENT_NOTEBOOK_FAILURE]: fi.set('notebookLoading', true),
  [GET_CURRENT_NOTEBOOK_SUCCESS]: (state, { payload }) => flow(
    fi.set('notebook', fi.fromJS(payload)),
    fi.set('notebookLoading', false),
  )(state),
}, initialState);
