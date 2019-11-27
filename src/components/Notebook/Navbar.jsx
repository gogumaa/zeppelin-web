import React from 'react';
import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux-immutable';
import AutosizeInput from 'react-input-autosize';
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPlayCircle,
  faExpandArrowsAlt,
  faBookOpen,
  faRemoveFormat,
  faCopy,
  faDownload,
  faUpload,
  faExchangeAlt,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';

import identity from 'lodash/fp/identity';

import * as currentNotebookSelectors from '~/dux/currentNotebook/selectors';

const StyledNavbar = styled(Navbar)`
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 5px 24px;
`;
const StyledButton = styled(Button)`
  background-color: #fff;
  border-color: #aaa;
  color: #aaa;

  && {
    padding: 2px 7px;

    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const NotebookNavbar = ({ notebookName }) => (
  <StyledNavbar>
    <Navbar.Brand>
      <AutosizeInput
        autoFocus
        placeholder={notebookName}
        value={notebookName}
        onChange={identity}
        // onKeyDown={this.onKeyPress}
        // onBlur={this.handleOnBlur}
        inputStyle={{
          border: 'none',
          fontSize: '28px',
          fontWeight: '700',
          color: 'rgba(0, 0, 0, 0.65)',
        }}
      />
    </Navbar.Brand>
    <ButtonToolbar>
      <ButtonGroup className='mr-2' aria-label='First group' size='sm'>
        <StyledButton><FontAwesomeIcon icon={faPlayCircle} /></StyledButton>
        <StyledButton><FontAwesomeIcon icon={faExpandArrowsAlt} /></StyledButton>
        <StyledButton><FontAwesomeIcon icon={faBookOpen} /></StyledButton>
        <StyledButton><FontAwesomeIcon icon={faRemoveFormat} /></StyledButton>
        <StyledButton><FontAwesomeIcon icon={faCopy} /></StyledButton>
        <StyledButton><FontAwesomeIcon icon={faDownload} /></StyledButton>
      </ButtonGroup>

      <ButtonGroup className='mr-2' aria-label='Second group' size='sm'>
        <StyledButton>Head</StyledButton>
        <StyledButton><FontAwesomeIcon icon={faUpload} /></StyledButton>
        <StyledButton><FontAwesomeIcon icon={faArrowAltCircleRight} /></StyledButton>
        <StyledButton><FontAwesomeIcon icon={faExchangeAlt} /></StyledButton>
      </ButtonGroup>

      <ButtonGroup aria-label='Third group' size='sm'>
        <StyledButton><FontAwesomeIcon icon={faTrash} /></StyledButton>
      </ButtonGroup>
    </ButtonToolbar>
  </StyledNavbar>
);

NotebookNavbar.propTypes = {
  notebookName: PropTypes.string,
};

NotebookNavbar.defaultProps = {
  notebookName: '',
};

export default connect((state) => ({
  notebookName: currentNotebookSelectors.getNotebookName(state),
}), {})(NotebookNavbar);
