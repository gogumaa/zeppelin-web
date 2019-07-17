import * as fi from "functional-immutable";
import { handleActions } from "redux-actions";

import initialState from "./initialState";
import {
  GET_NOTEBOOKS,
  GET_NOTEBOOKS_SUCCESS,
  GET_NOTEBOOKS_FAILURE,
} from "./actionTypes";

export default handleActions({
  [GET_NOTEBOOKS]: fi.set("notebooksLoading", true),
  [GET_NOTEBOOKS_FAILURE]: fi.set("notebooksLoading", true),
  // need to save notebook list included in the payload
  [GET_NOTEBOOKS_SUCCESS]: fi.set("notebooksLoading", false),
}, initialState);
