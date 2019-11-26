import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux-immutable';
// Import ace-builds and the AceEditor Component
import AceEditor from "react-ace";
// language supported:
// "text", <= default
// "python",
// "r",
// "markdown",
// "sql",
// "scala",
// "sh",
// lazy load all ace-builds mode with webpack async
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/snippets/text";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/mode-r";
import "ace-builds/src-noconflict/snippets/r";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/snippets/markdown";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/snippets/sql";
import "ace-builds/src-noconflict/mode-scala";
import "ace-builds/src-noconflict/snippets/scala";
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/snippets/sh";
// theme
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/keybinding-emacs";
// For autocompletion
import "ace-builds/src-noconflict/ext-language_tools";

import identity from "lodash/fp/identity";

import * as currentNotebookSelectors from '~/dux/currentNotebook/selectors';

const Container = styled.div`
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  box-shadow: none;
  padding: 10px 24px;
  margin-top: 5px; 
`;

const INITIAL_EDITOR_MODE = "text"; // default
const Paragraph = ({
  editorText,
  paragraphId,
  lineNumbers,
  editorLanguage,
}) => (
  <Container>
    <AceEditor
      minLines={1}
      width="100%"
      // onLoad={this.onLoad}
      maxLines={Infinity}
      onChange={identity}
      onBlur={identity}
      // onPaste={(_) => {
      //   this.handleChange(editorText, _, true);
      // }}
      // onFocus={this.handleFocus}
      // highlightActiveLine={isFocused}
      mode={editorLanguage || INITIAL_EDITOR_MODE}
      theme="chrome"
      name={`${paragraphId}__ace-editor`}
      // https://zeplteam.atlassian.net/browse/ZEPL-5136
      // ace_editor ace-chrome should be added to do not miss it as default className
      className={`editor ace_editor ace-chrome`}// ${addOnClassName} ${autoCompleteLoaderClass}`}
      value={editorText}
      commands={[{
        name: "indentOrAutocomplete",
        bindKey: { win: "Tab", mac: "Tab" },
        exec: editor => (
          shouldIndent(editor)
            ? editor.indent()
            : editor.execCommand("startAutocomplete")
        ),
      }]}
      setOptions={{
        showGutter: Boolean(lineNumbers),
        enableBasicAutocompletion: true,
        // enableBasicAutocompletion: [
        //   this.remoteAutocomplete.call(this),
        //   this.intpAutocomplete.call(this),
        // ],
        enableSnippets: false,
        showLineNumbers: Boolean(lineNumbers),
        tabSize: 4,
        // readOnly: disableEditor,
        cursorStyle: "smooth",
      }}
      editorProps={{
        $blockScrolling: Infinity,
      }}
    />
  </Container>
);

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
