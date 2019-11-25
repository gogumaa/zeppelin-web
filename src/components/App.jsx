import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { initializeApp } from '~/dux/websocket/actions';
import { getNotebooks } from '~/dux/notebooks/actions';
import Main from './Main';
import Notebook from './Notebook';
import NotFoundPage from './NotFoundPage';

class App extends React.Component {
  componentDidMount() {
    const { initApp, fetchNotebooks } = this.props;
    initApp();
    fetchNotebooks();
  }

  render() {
    return (
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
      </>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  initApp: PropTypes.func.isRequired,
};

export default connect(_ => _, {
  initApp: initializeApp,
  fetchNotebooks: getNotebooks,
})(hot(module)(App));
