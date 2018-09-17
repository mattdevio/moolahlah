/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/
import { LANDING } from '@/constants/routes';
import { Navigation } from '@/components';

class Header extends Component {

  render() {
    return (
      <HeaderContainer>
        <HeaderWrapper>
          <LogoEscapeHatch />
          <Navigation />
        </HeaderWrapper>
      </HeaderContainer>
    );
  }

}

export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${({theme}) => theme.beige};
`;

const HeaderWrapper = styled.div`
  max-width: ${({theme}) => theme.maxWidth};
  padding: 1.5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 10rem;
`;

const LogoEscapeHatch = styled.a.attrs({
  children: 'moolahlah',
  href: LANDING,
})`
  font-size: 4.5rem;
  font-family: ${({theme}) => theme.accentFont};
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;