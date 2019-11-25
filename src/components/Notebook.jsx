import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux-immutable";

import get from "lodash/fp/get";

import { getCurrentNotebook } from "~/dux/currentNotebook/actions";

class Notebook extends React.Component {
  componentDidMount() {
    const { onGetCurrentNotebook, notebookId } = this.props;
    onGetCurrentNotebook(notebookId);
  }

  render() {
    const { notebookId } = this.props;
    return (
      <div>{notebookId}</div>
    );
  }
}

Notebook.propTypes = {
  notebookId: "",
  onGetCurrentNotebook: PropTypes.func.isRequired,
};

export default connect((_state, props) => ({
  notebookId: get("match.params.notebookId", props),
}), {
  onGetCurrentNotebook: getCurrentNotebook,
})((Notebook));
