import React from 'react';
import { connect } from 'react-redux';
import { getNotebooks } from '~/dux/notebooks/actions.js';

const Main = ({ onBtnClick }) => (
  <>
    <h1>Apache Zeppelin webapp in React</h1>
    <button onClick={onBtnClick}>Trigger action</button>
  </>
);

export default connect(_ => _, {
  onBtnClick: getNotebooks,
})(Main);
