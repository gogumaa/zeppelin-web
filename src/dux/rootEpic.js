import { combineEpics } from 'redux-observable';

import wsEpic from './websocket/epics';

const rootEpic = combineEpics(
  wsEpic,
  // ...
);

export default rootEpic;
