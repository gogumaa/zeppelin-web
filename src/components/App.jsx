import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';

import Main from './Main';
import Notebook from './Notebook';
import NotFoundPage from './NotFoundPage';

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Main} />
      {/* < Route path="/notebookRepos" component={} /> */}
      {/* <Route path="/credential" component={} /> */}
      {/* <Route path="/helium" component={} /> */}
      {/* <Route path="/configuration" component={} /> */}
      {/* <Route path="/interpreter" component={} /> */}
      <Route path="/notebook/:notebookId" component={Notebook} />
      <Route component={NotFoundPage} />
    </Switch>
    {/* TODO: Render a list of notebooks */}
  </>
);

App.propTypes = {
  children: PropTypes.element,
};

export default hot(module)(App);
