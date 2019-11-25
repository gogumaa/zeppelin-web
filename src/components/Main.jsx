import React from 'react';
import { connect } from 'react-redux-immutable';
import map from "lodash/fp/map";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { getNotebookListSelector } from '~/dux/notebooks/selectors';

const StyledLink = styled(Link)`
  display: block;
`;

const Main = ({ notebookList }) => {
  return (
    <>
      <h1>Apache Zeppelin webapp in React</h1>
      <div>
        {map(({ name, id }) =>
          <StyledLink to={`/notebook/${id}`}>{name}</StyledLink>
          , notebookList)}
      </div>
    </>
  );
};

export default connect((state) => ({
  notebookList: getNotebookListSelector(state),
}), {})(Main);
