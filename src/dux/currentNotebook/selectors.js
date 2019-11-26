import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import * as fi from 'functional-immutable';
import get from 'lodash/fp/get';

/**
 * @module selectors/currentNotebook
 */

const getCurrentNotebookState = get('currentNotebook');
const paragraphIdentityResolver = (_state, { paragraphId }) => paragraphId;

/**
 * Get notebook list
 * @function
 * @param {Object} state - The redux state
 * @returns {Object} state.currentNotebook.notebook
 */
export const getNotebookSubState = createSelector(
  getCurrentNotebookState,
  fi.get('notebook'),
);

/**
 * Get notebook list
 * @function
 * @param {Object} state - The redux state
 * @returns {Object} state.currentNotebook.notebook.name
 */
export const getNotebookName = createSelector(
  getNotebookSubState,
  fi.get('name'),
);

/**
 * Get notebook list
 * @function
 * @param {Object} state - The redux state
 * @returns {Object} state.currentNotebook.notebook.paragraphs
 */
export const getParagraphsSubState = createSelector(
  getNotebookSubState,
  fi.get('paragraphs'),
);

/**
 * A list of paragraph IDs
 * @function
 * @param {Object} state - The redux state
 * @returns {Object} state.currentNotebook.notebook.paragraphs -> get 'id' list
 */
export const getListOfParagraphId = createSelector(
  getParagraphsSubState,
  fi.map(
    fi.get('id'),
  ),
);

/**
 * @function cached selector that return paragraph with paragraphId
 * @param {Object} state - The redux state
 * @param {Object} { paragraphId } The paragraph.id of target paragraph
 * @returns {object} Immutable Paragraph Object
 */
export const getParagraphSelector = createCachedSelector(
  getParagraphsSubState,
  // Please use paragraphIdentityResolver only for cache key
  (_state, { paragraphId }) => paragraphId,
  (paragraphs, paragraphId) => fi.find(
    paragraph => fi.get('id')(paragraph) === paragraphId,
  )(paragraphs),
)(paragraphIdentityResolver);

/**
 * @function
 * @param {Object} state - The redux state
 * @param {Object} { paragraphId } The paragraph.id of target paragraph
 * @returns {String} paragraph.text
 */
export const paragraphEditorTextSelector = createCachedSelector(
  getParagraphSelector,
  fi.get('text'),
)(paragraphIdentityResolver);

/**
 * @function cached selector return paragraph config(duplicated in chart selectors)
 * @param {Object} state - The redux state
 * @param {Object} { paragraphId } The paragraph.id of target paragraph
 * @returns {object} Immutable Paragraph.config
 */
export const getParagraphConfigSelector = createCachedSelector(
  getParagraphSelector,
  fi.get('config', null),
)(paragraphIdentityResolver);

/**
 * @function
 * @param {Object} state - The redux state
 * @param {Object} { paragraphId } The paragraph.id of target paragraph
 * @returns {Object} Immutable Paragraph.config.lineNumbers
 */
export const getParagraphLineNumberVisibilitySelector = createCachedSelector(
  getParagraphConfigSelector,
  fi.get('lineNumbers', false),
)(paragraphIdentityResolver);

/**
 * @param {Object} state - The redux state
 * @param {Object} { paragraphId } The paragraph._id of target paragraph
 * @returns {String} Paragraph.config.editorSetting.language
 */
export const getParagraphConfigEditorSettingLanguageSelector = createCachedSelector(
  getParagraphConfigSelector,
  fi.getIn(['editorSetting', 'language'], ''),
)(paragraphIdentityResolver);
