/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom imports  ----------*/
import MonthSelector from '@/components/MonthSelector';


class DesignSection extends Component {
  render() {
    return (
      <DesignSectionContainer>
        <MonthSelector />
      </DesignSectionContainer>
    );
  }
}

export default DesignSection;


const DesignSectionContainer = styled.div`
  width: 100%;
  height: calc(100% - 5rem);
  background-color: ${({ theme }) => theme.skyBlue};
  padding: 1.5rem 0.5rem;
`;
