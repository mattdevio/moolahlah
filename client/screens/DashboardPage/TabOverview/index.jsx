/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom imports  ----------*/


class TabOverview extends Component {
  render() {
    return (
      <TabOverviewContainer>
        <h1>Empty Class Component</h1>
      </TabOverviewContainer>
    );
  }
}

export default TabOverview;


const TabOverviewContainer = styled.div`
  width: 40rem;
  height: 100%;
  background: yellow;
`;
