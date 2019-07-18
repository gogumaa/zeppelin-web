import {
  GET_NOTEBOOKS,
  GET_NOTEBOOKS_SUCCESS,
  // GET_NOTEBOOKS_FAILURE,
} from "./actionTypes";

export const getNotebooks = (/*payload*/) => ({
  type: GET_NOTEBOOKS,
});

export const getNotebooksSuccess = (payload) => ({
  type: GET_NOTEBOOKS_SUCCESS,
  payload,
});
