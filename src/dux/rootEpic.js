import { combineEpics } from 'redux-observable';

import notebookEpic from './notebooks/epics';

const rootEpic = combineEpics(
  notebookEpic,
);

export default rootEpic;
