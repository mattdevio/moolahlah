/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom imports  ----------*/
import MoolahlahLogo from '@/components/MoolahlahLogo';

class ContentSection extends Component {
  render() {
    return (
      <ContentSectionContainer>
        <MoolahlahLogo width='20' margin='0 auto 2rem auto' />
      </ContentSectionContainer>
    );
  }
}

export default ContentSection;

const ContentSectionContainer = styled.div`
  width: calc(100% - 40rem);
  height: 100%;
  min-height: 100%;
  padding: 1.5rem;
`;

