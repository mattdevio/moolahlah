/*----------  Vendor Import  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/


/*======================================
=            Landing Screen            =
======================================*/

class Landing extends Component {
  render() {
    return (
      <Logo>moolahlah</Logo>
    );
  }
}

export default Landing;

/*=====  End of Landing Screen  ======*/

const Logo = styled.h1`
  font-family: ${({ theme }) => theme.accentFont };
  font-size: 3rem;
  padding: 1.5rem;
  margin: 0;
  text-align: center;
  ${({theme}) => [
    theme.small`
      font-size: 4rem;
    `,
    theme.medium`
      font-size: 5rem;
    `,
  ]}
`;
