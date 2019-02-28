// Vendor Imports
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Custom Imports
import ContentSectionContainer from '@/components/atoms/ContentSectionContainer';
import ContentSectionWrapper from '@/components/atoms/ContentSectionWrapper';
import TabContentContainer from '@/components/atoms/TabContentContainer';
import TabSelector from '@/components/molecules/TabSelector';
import MoolahlahLogo from '@/components/atoms/MoolahlahLogo';
import CurrentBudgetDisplay from '@/components/atoms/CurrentBudgetDisplay';
import MonthSelector from '@/components/molecules/MonthSelector';
import AddTransactionForm from '../organisms/AddTransactionForm';
import {
  lookupBudget,
  BudgetStatusEnum,
} from '@/state/ducks/budget';


class BudgetDesignPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { currentYear, currentMonth, budgetStatus, dispatchLookupBudget } = this.props;
    if (budgetStatus !== BudgetStatusEnum.loaded) {
      dispatchLookupBudget(currentYear, currentMonth);
    }
  }

  render() {
    const { budgetStatus } = this.props;
    return (
      <Fragment>
        <ContentSectionContainer>
          <ContentSectionWrapper>
            <MoolahlahLogo width='20' margin='0 auto 1rem auto' />
            <CurrentBudgetDisplay />
            { budgetStatus === BudgetStatusEnum.loaded && <AddTransactionForm /> }
          </ContentSectionWrapper>
        </ContentSectionContainer>
        <TabContentContainer bgColor='lightBlue'>
          <TabSelector />
          <MonthSelector />
        </TabContentContainer>
      </Fragment>
    );
  }

}

BudgetDesignPage.propTypes = {
  currentYear: PropTypes.number.isRequired,
  currentMonth: PropTypes.number.isRequired,
  budgetStatus: PropTypes.number.isRequired,
  dispatchLookupBudget: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentYear: state.budget.currentYear,
  currentMonth: state.budget.currentMonth,
  budgetStatus: state.budget.budgetStatus,
});

const mapDispatchToProps = dispatch => ({
  dispatchLookupBudget: (currentYear, currentMonth) => dispatch(lookupBudget({ currentYear, currentMonth }))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetDesignPage);
