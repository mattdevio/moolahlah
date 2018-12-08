/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom imports  ----------*/


class VisionSection extends Component {
  render() {
    return (
      <VisionSectionContainer>
        Vision Section
      </VisionSectionContainer>
    );
  }
}

export default VisionSection;

const VisionSectionContainer = styled.div`
  width: 100%;
  height: calc(100% - 5rem);
  background-color: ${({ theme }) => theme.mediumBlue};
  padding: 1.5rem 0.5rem;
`;
