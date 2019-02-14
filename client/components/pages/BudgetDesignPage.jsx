// Vendor Imports
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Custom Imports
import ContentSectionContainer from '@/components/atoms/ContentSectionContainer';
import ContentSectionWrapper from '@/components/atoms/ContentSectionWrapper';
import TabContentContainer from '@/components/atoms/TabContentContainer';
import TabSelector from '@/components/molecules/TabSelector';
import MonthSelector from '@/components/molecules/MonthSelector';
import MoolahlahLogo from '@/components/atoms/MoolahlahLogo';
import CategoryGroup from '@/components/organisms/CategoryGroup';


class BudgetDesignPage extends Component {

  render() {
    return (
      <Fragment>
        <ContentSectionContainer>
          <ContentSectionWrapper>
            <MoolahlahLogo width='20' margin='0 auto 2rem auto' />


            <CategoryGroup
            />

          </ContentSectionWrapper>
        </ContentSectionContainer>
        <TabContentContainer bgColor='skyBlue'>
          <TabSelector />
          <MonthSelector />
        </TabContentContainer>
      </Fragment>
    );
  }

}

export default BudgetDesignPage;
