/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

/*----------  Custom imports  ----------*/
import TabSelector from './TabSelector';
import * as routes from '@/constants/routes';
import DesignSection from './TabSections/DesignSection';
import TransactionSection from './TabSections/TransactionSection';
import VisionSection from './TabSections/VisionSection';
import AccountSection from './TabSections/AccountSection';

class TabOverview extends Component {
  render() {
    return (
      <TabOverviewContainer>
        <TabSelector />
        <Switch>
          <Route
            path={ routes.DASHBOARD_DESIGN }
            component={ DesignSection }
          />
          <Route
            path={ routes.DASHBOARD_TRANSACTION }
            component={ TransactionSection }
          />
          <Route
            path={ routes.DASHBOARD_VISION }
            component={ VisionSection }
          />
          <Route
            path={ routes.DASHBOARD_ACCOUNT }
            component={ AccountSection }
          />
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
