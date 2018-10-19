/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const {
      windowHeight,
    } = this.props;
    return (
      <DashboardPageContainer height={ windowHeight }>
        <ContentSection />
        <TabOverview />
      </DashboardPageContainer>
    );
  }
}

DashboardPage.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  windowWidth: state.ui.windowWidth,
  windowHeight: state.ui.windowHeight,
});

const connectedDashboardPage = connect(mapStateToProps)(DashboardPage);
export default withAuthorization(connectedDashboardPage);

/*=====  End of DashboardPage  ======*/

const DashboardPageContainer = styled.div.attrs({
  style: ({ height }) => ({
    minHeight: `${height}px`,
  }),
})`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;
