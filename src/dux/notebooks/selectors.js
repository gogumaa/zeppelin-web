import { createSelector } from 'reselect';
import * as fi from 'functional-immutable';
import get from 'lodash/fp/get';

/**
 * @module selectors/notebooks
 */

const getNotebookState = get('notebooks');

/**
 * Get notebook list
 * @function
 * @param {Object} state - The redux state
 * @returns {Object} state.notebooks.notebookList
 */
export const getNotebookListSelector = createSelector(
  getNotebookState,
  fi.get('notebookList'),
);
