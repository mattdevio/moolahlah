/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/
import { LANDING } from '@/constants/routes';

class Header extends Component {

  render() {
    return (
      <HeaderContainer>
        <LogoEscapeHatch />
      </HeaderContainer>
    );
  }

}

export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  max-width: ${({theme}) => theme.maxWidth};
  padding: 1.5rem;
  margin: 0 auto;
`;

const LogoEscapeHatch = styled.a.attrs({
  children: 'moolahlah',
  href: LANDING,
})`
  font-size: 3rem;
  font-family: ${({theme}) => theme.accentFont};
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;