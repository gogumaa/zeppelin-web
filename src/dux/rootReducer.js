import { combineReducers } from "redux";
// import notebooks from "./notebooksReducer";
import { connectRouter } from "connected-react-router";

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  // notebooks,
});

export default rootReducer;
