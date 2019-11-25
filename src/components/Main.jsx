import React from 'react';
import { connect } from 'react-redux-immutable';
import map from "lodash/fp/map";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faTrash, faRemoveFormat, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { getNotebookListSelector } from '~/dux/notebooks/selectors';
import ZeppelinBGLogo from '~images/icons/zeppelin_svg_logo_bg.svg';

const OuterContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  padding-top: 12px;
`;
const Container = styled.div`
  margin: 0 12px 12px;
  border: 1px solid #d9d9d9;
  padding: 24px;
  background-color: #fff;
  position: relative;
  background-image: url(${ZeppelinBGLogo});
  background-repeat: no-repeat;
  background-position: right bottom;
  
  h1 {
    margin-top: 0;
    margin-bottom: 0.5em;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
  }
  
  h3 {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    margin-bottom: 0;
    line-height: 22px;
    font-weight: 300;
  }
  
  h4 {
    font-size: 18px;
    margin: 16px 0 10px;
  }
`;
const StyledNoteName = styled.div`
  font-size: 14px;
  margin: 2px 10px;
  display: flex;
  align-items: center;  

  svg {
    display: inline-block;
    margin-right: 5px;
    width: 16px !important;

    path {
      fill: #3071a9;    
    }
  }
  
  a {
    color: #3071a9;
  }
`;
const ActionIconContainer = styled.div`
  display: none;
  margin-left: 5px;

  &:hover {
    display: flex;
  }
`;

const Main = ({ notebookList }) => {
  return (
    <OuterContainer>
      <Container>
        <h1>Welcome to Zeppelin!</h1>
        <h3>Zeppelin is web-based notebook that enables interactive data analytics.</h3>
        <h3>You can make beautiful data-driven, interactive, collaborative document with SQL, code and even more!</h3>
        <h4>Notebook</h4>
        {map(({ name, id }) => (
          <StyledNoteName>
            <FontAwesomeIcon icon={faFileAlt} />
            <Link to={`/notebook/${id}`}>{name}</Link>
            <ActionIconContainer>
              <FontAwesomeIcon icon={faPencilAlt} />
              <FontAwesomeIcon icon={faRemoveFormat} />
              <FontAwesomeIcon icon={faTrash} />
            </ActionIconContainer>
          </StyledNoteName>
          ), notebookList)}
      </Container>
    </OuterContainer>
  );
};

export default connect((state) => ({
  notebookList: getNotebookListSelector(state),
}), {})(Main);
