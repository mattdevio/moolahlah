// Vendor Imports
import React, { Component, Fragment } from 'react';
// import styled from 'styled-components';

// Custom Imports
import ContentSectionContainer from '@/components/atoms/ContentSectionContainer';
import ContentSectionWrapper from '@/components/atoms/ContentSectionWrapper';
import TabContentContainer from '@/components/atoms/TabContentContainer';
import TabSelector from '@/components/molecules/TabSelector';
import MoolahlahLogo from '@/components/atoms/MoolahlahLogo';
import YearSelector from '@/components/molecules/YearSelector';

class BudgetVisionPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <ContentSectionContainer>
          <ContentSectionWrapper>
            <MoolahlahLogo width='20' margin='0 auto 1rem auto' />
          </ContentSectionWrapper>
        </ContentSectionContainer>
        <TabContentContainer bgColor='mediumBlue'>
          <TabSelector />
          <YearSelector />
        </TabContentContainer>
      </Fragment>
    );
  }

}

export default BudgetVisionPage;