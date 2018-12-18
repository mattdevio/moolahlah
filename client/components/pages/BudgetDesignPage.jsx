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
import MoolahlahLogo from '@/components/atoms/MoolahlahLogo';
import { lookupBudget } from '@/state/ducks/budget';


class BudgetDesignPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatchLookupBudget, currentYear, currentMonth } = this.props;
    dispatchLookupBudget(currentMonth, currentYear);
  }

  render() {
    const { currentYear } = this.props;
    return (
      <Fragment>
        <ContentSectionContainer>
          <ContentSectionWrapper>
            <MoolahlahLogo width='20' margin='0 auto 0 auto' />
            <CurrentBudgetMonth>
              { `${currentYear}` }
            </CurrentBudgetMonth>
          </ContentSectionWrapper>
        </ContentSectionContainer>
        <TabContentContainer bgColor='skyBlue'>
          <TabSelector />
        </TabContentContainer>
      </Fragment>
    );
  }

}

BudgetDesignPage.propTypes = {
  currentYear: PropTypes.number.isRequired,
  currentMonth: PropTypes.number.isRequired,
  dispatchLookupBudget: PropTypes.func.isRequired,
};

const mapStatetoProps = state => ({
  currentYear: state.budget.currentYear,
  currentMonth: state.budget.currentMonth,
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
