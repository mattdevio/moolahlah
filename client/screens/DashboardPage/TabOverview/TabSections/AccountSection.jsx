/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom imports  ----------*/


class AccountSection extends Component {
  render() {
    return (
      <AccountSectionContainer>
        Account Section
      </AccountSectionContainer>
    );
  }
}

export default AccountSection;


const AccountSectionContainer = styled.div`
  width: 100%;
  height: calc(100% - 5rem);
  background-color: ${({ theme }) => theme.darkBlue};
  padding: 0.5rem;
`;
