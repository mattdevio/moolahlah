/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom imports  ----------*/
import TabSelector from './TabSelector';

class TabOverview extends Component {
  render() {
    return (
      <TabOverviewContainer>
        <TabSelector />
      </TabOverviewContainer>
    );
  }
}

export default TabOverview;


const TabOverviewContainer = styled.div`
  width: 40rem;
  height: 100%;
  min-height: 100%;
  background: yellow;
  position: fixed;
  top: 0;
  right: 0;
`;
