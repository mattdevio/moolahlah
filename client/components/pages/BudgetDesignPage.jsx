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
import StartNewMonth from '@/components/molecules/StartNewMonth';
import { lookupBudget } from '@/state/ducks/budget';


class BudgetDesignPage extends Component {

  componentDidMount() {
    const { currentYear, currentMonth, dispatchLookupBudget } = this.props;
    dispatchLookupBudget(currentYear, currentMonth);
  }

  render() {
    return (
      <Fragment>
        <ContentSectionContainer>
          <ContentSectionWrapper>
            <MoolahlahLogo width='20' margin='0 auto 2rem auto' />
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

const mapStateToProps = state => ({
  currentYear: state.budget.currentYear,
  currentMonth: state.budget.currentMonth,
});

const mapDispatchToProps = dispatch => ({
  dispatchLookupBudget: (currentYear, currentMonth) => dispatch(lookupBudget({ currentYear, currentMonth }))
});

BudgetDesignPage.propTypes = {
  currentYear: PropTypes.number.isRequired,
  currentMonth: PropTypes.number.isRequired,
  dispatchLookupBudget: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetDesignPage);
