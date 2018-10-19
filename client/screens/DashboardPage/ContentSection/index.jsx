/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom imports  ----------*/


class ContentSection extends Component {
  render() {
    return (
      <ContentSectionContainer>
        <h1>This is the content section</h1>
      </ContentSectionContainer>
    );
  }
}

export default ContentSection;

const ContentSectionContainer = styled.div`
  width: 100%;
  height: 100%;
  background: green;
`;

