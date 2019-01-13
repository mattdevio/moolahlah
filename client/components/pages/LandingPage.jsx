/*----------  Vendor imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom imports  ----------*/
import ComboAuthBox from '@/components/organisms/ComboAuthBox';
import MoolahlahLogo from '@/components/atoms/MoolahlahLogo';

/*==========================================
=            LandingPage Screen            =
==========================================*/

class LandingPage extends Component {
  render() {
    return (
      <LandingPageContainer>
        <MoolahlahLogo />
        <MainLine>Personal Finance Manager</MainLine>
        <SubLine>
          The first step to saving money<br />
          is to make a plan!
        </SubLine>
        <ComboAuthBox />
      </LandingPageContainer>
    );
  }
}


export default LandingPage;

/*=====  End of LandingPage Screen  ======*/

const LandingPageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const MainLine = styled.h2`
  font-size: 3rem;
  font-family: ${({ theme }) => theme.typeFont};
  color: ${({ theme }) => theme.darkBlue};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  margin: 0 0 2rem 0;
`;

const SubLine = styled.p`
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  text-align: center;
  font-family: ${({ theme }) => theme.typeFont};
  color: ${({ theme }) => theme.darkBlue};
  font-weight: 400;
  margin: 0 0 2rem 0;
`;
