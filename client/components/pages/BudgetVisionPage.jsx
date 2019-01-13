// Vendor Imports
import React, { Component, Fragment } from 'react';
// import styled from 'styled-components';

// Custom Imports
import ContentSectionContainer from '@/components/atoms/ContentSectionContainer';
import ContentSectionWrapper from '@/components/atoms/ContentSectionWrapper';
import TabContentContainer from '@/components/atoms/TabContentContainer';
import TabSelector from '@/components/molecules/TabSelector';

class BudgetVisionPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <ContentSectionContainer>
          <ContentSectionWrapper>
            Vision Page
          </ContentSectionWrapper>
        </ContentSectionContainer>
        <TabContentContainer bgColor='mediumBlue'>
          <TabSelector />
        </TabContentContainer>
      </Fragment>
    );
  }

}

export default BudgetVisionPage;