/*----------  Vendor Imports  ----------*/
import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

/*=============================================
=            NavListItem Component            =
=============================================*/

const NavListItem = ({ to, displayName }) => (
  <ListItem>
    <StyledNavLink to={to}>
      { displayName }
    </StyledNavLink>
  </ListItem>
);

NavListItem.propTypes = {
  to: string.isRequired,
  displayName: string.isRequired,
};

export default NavListItem;

/*=====  End of NavListItem Component  ======*/

const ListItem = styled.li`
  display: inline-block;
`;

const StyledNavLink = styled(NavLink).attrs({
  activeClassName: 'active',
  exact: true,
})`
  padding: 0 0.5em;
  text-decoration: none;
  font-family: ${({theme}) => theme.typeFont};
  color: #FFFFFF;
  font-size: 2em;
  &.active {
    border-bottom: 2px solid #FFFFFF;
  }
`;