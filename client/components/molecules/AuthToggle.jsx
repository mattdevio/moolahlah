/*----------  Vendor Imports  ----------*/
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

/*----------  Custom imports  ----------*/
import * as routes from '@/constants/routes';

/*==================================
=            AuthToggle            =
==================================*/

const AuthToggle = () => (
  <AuthToggleContainer>
    <RouteableButton to={ routes.AUTH_REGISTER }>Register</RouteableButton>
    <RouteableButton to={ routes.AUTH_SIGNIN }>Sign In</RouteableButton>
    <BottomMarker />
  </AuthToggleContainer>
);

export default AuthToggle;

/*=====  End of AuthToggle  ======*/


const AuthToggleContainer = styled.div`
  display: block;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const RouteableButton = styled(NavLink).attrs({
  activeClassName: 'active',
  exact: true,
})`
  font-family: ${({ theme }) => theme.typeFont};
  font-weight: 700;
  font-size: 2.5rem;
  letter-spacing: 0.2rem;
  width: 50%;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.white};
  text-align: center;
  padding: 2rem 0 2.5rem 0;
  background-color: ${({ theme }) => theme.skyBlue};
  &.active {
    background-color: ${({ theme }) => theme.mediumBlue};
  }
  &:focus {
    outline: none;
  }
`;

const BottomMarker = styled.span`
  width: 100%;
  height: 1rem;
  background-color: ${({ theme }) => theme.mediumBlue};
  position: absolute;
  bottom: 0;
  left: 0;
`;