import React from 'react';
import { Navbar, Form, FormControl } from 'react-bootstrap';
import styled from "styled-components";
import { Link } from "react-router-dom";
import ZeppelinLogo from '~images/icons/zeppelin_svg_logo.svg';

const StyledLogo = styled.img`
  height: 33px;
  width: 53px;
  margin: 2px 10px 0;
`;
const StyledNavbar = styled(Navbar)`
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 5px;
`;
const StyledNavBrand = styled(Navbar.Brand)`
  display: flex;
  margin-left: 10px;

  && span {
    font-family: 'Patua One', cursive;
    font-size: 25px;
    color: #3071A9;

    &:hover {
      color: #3071A9;  
    }
  }
`;

const StyledForm = styled(Form)`
  margin-left: auto;

  input {
    &::placeholder {
      opacity: 0.5;
      transition: all 0.2s;
      color: #aaa;
      font-size: 14px;
    }
  }
`;
const GlobalNavbar = () => (
  <StyledNavbar>
    <StyledNavBrand>
      <Link to="/">
        <StyledLogo src={ZeppelinLogo} />
      </Link>
      <span>Zeppelin</span>
    </StyledNavBrand>
    {/*<Nav className="mr-auto">*/}
      {/*<Nav.Link href="#home">Home</Nav.Link>*/}
    {/*</Nav>*/}
    <StyledForm inline>
      <FormControl type="text" placeholder="🔍 Search" className="mr-sm-2" />
    </StyledForm>
  </StyledNavbar>
);

export default GlobalNavbar;
