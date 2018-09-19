/*----------  Vendor Imports  ----------*/
import React from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/


/*========================================
=            Footer Component            =
========================================*/

const Footer = () => (
  <FooterContainer>
    <FooterWrapper>
      <FootText>
        moolahlah © { (new Date()).getFullYear() }
      </FootText>
    </FooterWrapper>
  </FooterContainer>
);

export default Footer;

/*=====  End of Footer Component  ======*/

const FooterContainer = styled.footer`
  background-color: ${({theme}) => theme.teal};
`;

const FooterWrapper = styled.div`
  max-width: ${({theme}) => theme.maxWidth};
  padding: 1.5rem;
  margin: 0 auto;
  font-size: 2rem;
  color: #FFFFFF;
  text-align: center;
  height: 50px;
`;

const FootText = styled.span`
  font-size: 1.4rem;
  font-family: ${({theme}) => theme.typeFont};
`;