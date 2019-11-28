import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux-immutable';
import MonacoEditor from 'react-monaco-editor';

import * as currentNotebookSelectors from '~/dux/currentNotebook/selectors';

const Container = styled.div`
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  box-shadow: none;
  padding: 10px 24px;
  margin-top: 5px;
`;

const LINE_HEIGHT = 18;
const PADDING = 50;
// const INITIAL_EDITOR_MODE = "text"; // default
const Paragraph = ({
  editorText,
  paragraphId,
  lineNumbers,
  editorLanguage,
}) => {
  // todo - find better logic to set editor height
  const height = ((editorText.split('\n').length) * LINE_HEIGHT) + PADDING;
  return (
    <Container>
      <MonacoEditor
        automaticLayout
        height={height}
        // width="100%"
        // height="500"
        language={editorLanguage}
        value={editorText}
        options={{
          selectOnLineNumbers: true,
        }}
        onChange={arg => console.warn({arg})}
        // editorDidMount={::this.editorDidMount}
      />
    </Container>
  );
};

Paragraph.propTypes = {
  editorText: PropTypes.string,
};

Paragraph.defaultProps = {
  editorText: '',
};

export default connect((state, { paragraphId }) => ({
  editorText: currentNotebookSelectors.paragraphEditorTextSelector(state, { paragraphId }),
  lineNumbers: currentNotebookSelectors.getParagraphLineNumberVisibilitySelector(state, { paragraphId }),
  editorLanguage: currentNotebookSelectors.getParagraphConfigEditorSettingLanguageSelector(state, { paragraphId }),
}), {})(Paragraph);
