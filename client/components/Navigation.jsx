/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/
import NavListItem from './NavListItem';
import * as routes from '@/constants/routes';

/*============================================
=            Navigation Component            =
============================================*/

class Navigation extends Component {
  render() {
    return (
      <NavList>
        <NavListItem to={routes.LANDING} displayName='Landing' />
        <NavListItem to={routes.SIGN_UP} displayName='Sign Up' />
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

