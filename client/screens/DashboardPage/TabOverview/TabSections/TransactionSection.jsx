/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom imports  ----------*/


class TransactionSection extends Component {
  render() {
    return (
      <DesignSectionContainer>
        Transaction Section
      </DesignSectionContainer>
    );
  }
}

export default TransactionSection;


const DesignSectionContainer = styled.div`
  width: 100%;
  height: calc(100% - 5rem);
  background-color: ${({ theme }) => theme.lightBlue};
  padding: 1.5rem 0.5rem;
`;

