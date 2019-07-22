import { combineEpics } from 'redux-observable';

import wsEpic from './websocket/epics';
import notebookEpic from './notebooks/epics';

const rootEpic = combineEpics(
  wsEpic,
  notebookEpic,
);

export default rootEpic;
