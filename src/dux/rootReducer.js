import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import notebooks from './notebooks/reducers';
import currentNotebook from './currentNotebook/reducers';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  notebooks,
  currentNotebook,
});

export default rootReducer;
