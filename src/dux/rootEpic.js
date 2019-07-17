import { combineEpics } from "redux-observable";

import notebookEpic from "./notebooks/epics.js";

const rootEpic = combineEpics(
  notebookEpic,
);

export default rootEpic;
