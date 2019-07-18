import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import notebooks from "./notebooks/reducers";

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  notebooks,
});

export default rootReducer;
