import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux-immutable';
import styled from 'styled-components';

import get from 'lodash/fp/get';
import map from 'lodash/fp/map';

import * as currentNotebookActions from '~/dux/currentNotebook/actions';
import * as currentNotebookSelectors from '~/dux/currentNotebook/selectors';

import Navbar from './Navbar';
import Paragraph from './Paragraph';

const NotebookContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const ParagraphContainer = styled.div`
  padding: 10px;
  height: 100%;
  background-color: #f5f5f5;
`;

class Notebook extends React.Component {
  componentDidMount() {
    const { onGetCurrentNotebook, notebookId } = this.props;
    onGetCurrentNotebook(notebookId);
  }

  render() {
    const { paragraphIdList } = this.props;
    return (
      <NotebookContainer>
        <Navbar />
        <ParagraphContainer>
          {map(paragraphId => <Paragraph paragraphId={paragraphId} key={paragraphId} />, paragraphIdList)}
        </ParagraphContainer>
      </NotebookContainer>
    )
  }
}

Notebook.propTypes = {
  notebookId: '',
  onGetCurrentNotebook: PropTypes.func.isRequired,
  paragraphIdList: PropTypes.arrayOf(PropTypes.string),
};

Notebook.defaultProps = {
  paragraphIdList: [],
};

export default connect((state, props) => ({
  notebookId: get('match.params.notebookId', props),
  paragraphIdList: currentNotebookSelectors.getListOfParagraphId(state),
}), {
  onGetCurrentNotebook: currentNotebookActions.getCurrentNotebook,
})((Notebook));
