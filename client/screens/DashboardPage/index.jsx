/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom imports  ----------*/
import withAuthorization from '@/hocs/withAuthorization';
import ContentSection from '@/screens/DashboardPage/ContentSection';
import TabOverview from '@/screens/DashboardPage/TabOverview';

/*=====================================
=            DashboardPage            =
=====================================*/

class DashboardPage extends Component {
  render() {
    return (
      <DashboardPageContainer>
        <ContentSection />
        <TabOverview />
      </DashboardPageContainer>
    );
  }
}

export default withAuthorization(DashboardPage);

/*=====  End of DashboardPage  ======*/

const DashboardPageContainer = styled.div`
  height: 100%;
  min-height: 100%;
  position: relative;
`;
