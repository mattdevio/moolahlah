// Vendor Imports
import React, { Component, Fragment } from 'react';
// import styled from 'styled-components';

// Custom Imports
import ContentSectionContainer from '@/components/atoms/ContentSectionContainer';
import TabContentContainer from '@/components/atoms/TabContentContainer';


class BudgetDesignPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <ContentSectionContainer>
          Hi
        </ContentSectionContainer>
        <TabContentContainer>
          Whatup
        </TabContentContainer>
      </Fragment>
    );
  }

}

export default BudgetDesignPage;
