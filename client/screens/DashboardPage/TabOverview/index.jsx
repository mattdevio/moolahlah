/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch } from 'react-router-dom';

/*----------  Custom imports  ----------*/
import TabSelector from './TabSelector';

class TabOverview extends Component {
  render() {
    return (
      <TabOverviewContainer>
        <TabSelector />
        <Switch>

        </Switch>
      </TabOverviewContainer>
    );
  }
}

export default TabOverview;


const TabOverviewContainer = styled.div`
  width: 40rem;
  height: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  right: 0;
`;
