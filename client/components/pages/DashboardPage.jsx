/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom imports  ----------*/
import withAuthorization from '@/bin/hocs/withAuthorization';
import ContentSection from '@/components/organisms/DashboardPage';
import TabOverview from '@/components/organisms/TabOverview';

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
