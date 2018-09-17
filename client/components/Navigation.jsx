/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/*----------  Custom Imports  ----------*/
import * as routes from '@/constants/routes';

/*============================================
=            Navigation Component            =
============================================*/

class Navigation extends Component {

  render() {
    return (
      <NavList>
        <li><SignIn /></li>
        <li><SignUp /></li>
      </NavList>
    );
  }
}

export default Navigation;

/*=====  End of Navigation Component  ======*/

const NavList = styled.ul`
  list-style-type: none;
  display: inline-block;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  > * {
    margin-left: 1.5rem;
  }
  > *:nth-child(1) {
    margin-left: 0;
  }
`;

const SignUp = styled(Link).attrs({
  to: routes.SIGN_UP,
  children: 'Sign Up',
})`
  padding: 0.3rem 1rem;
  text-decoration: none;
  font-size: 2rem;
  border-radius: 0.4rem;
  background-color: ${({theme}) => theme.green};
  color: ${({theme}) => theme.darkGreen};
  font-family: ${({theme}) => theme.typeFont};
`;

const SignIn = styled(Link).attrs({
  to: routes.SIGN_IN,
  children: 'sign in',
})`
  text-decoration: none;
  color: #000;
  font-size: 2rem;
  font-family: ${({theme}) => theme.typeFont};
`;

