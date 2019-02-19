// Vendor Imports
import React, { Component, Fragment } from 'react';
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
import CurrentBudgetDisplay from '@/components/atoms/CurrentBudgetDisplay';
import StartNewMonth from '@/components/molecules/StartNewMonth';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import {
  lookupBudget,
  BudgetStatusEnum,
} from '@/state/ducks/budget';


class BudgetDesignPage extends Component {

  componentDidMount() {
    const { currentYear, currentMonth, dispatchLookupBudget } = this.props;
    dispatchLookupBudget(currentYear, currentMonth);
  }

  render() {
    const { budgetStatus } = this.props;
    return (
      <Fragment>
        <ContentSectionContainer>
          <ContentSectionWrapper>
            <MoolahlahLogo width='20' margin='0 auto 2rem auto' />
            <CurrentBudgetDisplay />
            { budgetStatus === BudgetStatusEnum.loading && <LoadingSpinner /> }
            { budgetStatus === BudgetStatusEnum.notStarted && <StartNewMonth /> }
            { budgetStatus === BudgetStatusEnum.loaded && alert('loaded') }
            { budgetStatus === BudgetStatusEnum.error && alert('an error happened') }
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
  budgetStatus: state.budget.budgetStatus
});

const mapDispatchToProps = dispatch => ({
  dispatchLookupBudget: (currentYear, currentMonth) => dispatch(lookupBudget({ currentYear, currentMonth }))
});

BudgetDesignPage.propTypes = {
  currentYear: PropTypes.number.isRequired,
  currentMonth: PropTypes.number.isRequired,
  dispatchLookupBudget: PropTypes.func.isRequired,
  budgetStatus: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetDesignPage);
