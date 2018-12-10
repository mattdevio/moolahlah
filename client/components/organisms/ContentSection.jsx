/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

/*----------  Custom imports  ----------*/
import * as routes from '@/constants/routes';
import DesignContent from './ContentSections/DesignContent';
import TransactionContent from './ContentSections/TransactionContent';
import VisionContent from './ContentSections/VisionContent';
import AccountContent from './ContentSections/AccountContent';

/*=========================================
=            Dashboard Content            =
=========================================*/

class ContentSection extends Component {
  render() {
    return (
      <ContentSectionContainer>
        <Switch>
          <Route
            path={ routes.DASHBOARD_DESIGN }
            component={ DesignContent }
          />
          <Route
            path={ routes.DASHBOARD_TRANSACTION }
            component={ TransactionContent }
          />
          <Route
            path={ routes.DASHBOARD_VISION }
            component={ VisionContent }
          />
          <Route
            path={ routes.DASHBOARD_ACCOUNT }
            component={ AccountContent }
          />
          <Route
            render={ () => <Redirect to={ routes.DASHBOARD_DESIGN } /> }
          />
        </Switch>
      </ContentSectionContainer>
    );
  }
}

export default ContentSection;

/*=====  End of Dashboard Content  ======*/


const ContentSectionContainer = styled.div`
  width: calc(100% - 40rem);
  height: 100%;
  min-height: 100%;
  padding: 1.5rem;
`;

