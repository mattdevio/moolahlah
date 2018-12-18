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
import CategoryGroupSkeleton from '@/components/skeletons/CategoryGroupSkeleton';
import StartNewMonth from '@/components/molecules/StartNewMonth';
import CategoryGroup from '@/components/molecules/CategoryGroup';
import { lookupBudget } from '@/state/ducks/budget';
import { displayMonths } from '@/bin/dateHelpers';
import { BudgetStatusEnum } from '@/state/ducks/budget';


class BudgetDesignPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatchLookupBudget, currentYear, currentMonth } = this.props;
    dispatchLookupBudget(currentMonth, currentYear);
  }

  render() {
    const {
      currentMonth,
      currentYear,
      budgetStatus,
      incomeCategories,
      expenseCategories,
    } = this.props;
    return (
      <Fragment>
        <ContentSectionContainer>
          <ContentSectionWrapper>
            <MoolahlahLogo width='20' margin='0 auto 0 auto' />
            <CurrentBudgetMonth>
              { `${displayMonths[currentMonth]} ${currentYear}` }
            </CurrentBudgetMonth>
            {budgetStatus === BudgetStatusEnum.loading && (
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map(key => <CategoryGroupSkeleton key={ key } />)
            )}
            {budgetStatus === BudgetStatusEnum.loaded && (
              incomeCategories.map(category => (
                <CategoryGroup
                  key={ category }
                  category={ category }
                  baseColor={ 'lightBlue' }
                />
              ))
            )}
            {budgetStatus === BudgetStatusEnum.loaded && (
              expenseCategories.map(category => (
                <CategoryGroup
                  key={ category }
                  category={ category }
                  baseColor={ 'darkBlue' }
                />
              ))
            )}
            {budgetStatus === BudgetStatusEnum.notStarted && (
              <StartNewMonth />
            )}
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

BudgetDesignPage.propTypes = {
  currentYear: PropTypes.number.isRequired,
  currentMonth: PropTypes.number.isRequired,
  budgetStatus: PropTypes.number.isRequired,
  incomeCategories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenseCategories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatchLookupBudget: PropTypes.func.isRequired,
};

const mapStatetoProps = state => ({
  currentYear: state.budget.currentYear,
  currentMonth: state.budget.currentMonth,
  budgetStatus: state.budget.budgetStatus,
  incomeCategories: state.budget.incomeCategories,
  expenseCategories: state.budget.expenseCategories,
});

const mapDispatchToProps = dispatch => ({
  dispatchLookupBudget: (currentMonth, currentYear) => dispatch(lookupBudget({ currentMonth, currentYear })),
});

export default connect(mapStatetoProps, mapDispatchToProps)(BudgetDesignPage);


const CurrentBudgetMonth = styled.h3`
  font-size: 4.5rem;
  font-weight: 700;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typeFont};
  color: ${({ theme }) => theme.darkBlue};
  text-align: center;
  margin: 0 0 2rem 0;
  letter-spacing: 0.4rem;
`;
