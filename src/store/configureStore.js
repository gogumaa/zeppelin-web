import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createBrowserHistory } from 'history';
import { logger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

// "routerMiddleware": the new way of storing route changes with redux middleware since rrV4.
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from '~/dux/rootReducer';
import rootEpic from '~/dux/rootEpic';

export const history = createBrowserHistory();
const connectRouterHistory = connectRouter(history);

function configureStoreProd(initialState) {
  const epicMiddleware = createEpicMiddleware();
  const reactRouterMiddleware = routerMiddleware(history);
  const middleware = [
    reactRouterMiddleware,
    epicMiddleware,
  ];

  const store = createStore(
    rootReducer(history), // root reducer with router state
    initialState,
    compose(applyMiddleware(...middleware)),
  );

  epicMiddleware.run(rootEpic);

  return store;
}

function configureStoreDev(initialState) {
  const epicMiddleware = createEpicMiddleware();
  const reactRouterMiddleware = routerMiddleware(history);
  const middleware = [
    // Add other middleware on this line...
    logger,
    epicMiddleware,
    // Redux middleware that spits an error on you when you try to
    // mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),
    reactRouterMiddleware,
  ];

  // add support for Redux dev tools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer(history), // root reducer with router state
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  epicMiddleware.run(rootEpic);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('~/dux/rootReducer', () => {
      const nextRootReducer = require('~/dux/rootReducer').default; // eslint-disable-line global-require
      store.replaceReducer(connectRouterHistory(nextRootReducer));
    });
  }

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
