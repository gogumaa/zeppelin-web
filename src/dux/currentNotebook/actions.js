import {
  GET_CURRENT_NOTEBOOK,
  GET_CURRENT_NOTEBOOK_SUCCESS,
} from './actionTypes';

export const getCurrentNotebook = payload => ({
  type: GET_CURRENT_NOTEBOOK,
  payload,
});

export const getCurrentNotebookSuccess = payload => ({
  type: GET_CURRENT_NOTEBOOK_SUCCESS,
  payload,
});
