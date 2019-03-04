// Vendor Imports
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Custom Imports
import ContentSectionContainer from '@/components/atoms/ContentSectionContainer';
import ContentSectionWrapper from '@/components/atoms/ContentSectionWrapper';
import TabContentContainer from '@/components/atoms/TabContentContainer';
import TabSelector from '@/components/molecules/TabSelector';
import MoolahlahLogo from '@/components/atoms/MoolahlahLogo';
import YearSelector from '@/components/molecules/YearSelector';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import YearReviewGraph from '@/components/organisms/YearReviewGraph';
import OnlyMonthSelector from '@/components/molecules/OnlyMonthSelector';
import MonthReviewGraph from '@/components/organisms/MonthReviewGraph';
import { displayMonths } from '@/bin/dateHelpers';
import {
  AnalyticStatusEnum,
  requestYearReview,
  requestMonthReview,
} from '@/state/ducks/analytics';

class BudgetVisionPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { month, year, dispatchRequestYearReview, dispatchRequestMonthReview } = this.props;
    dispatchRequestYearReview(year);
    dispatchRequestMonthReview({ year, month });
  }

  render() {
    const { month, year, yearReviewStatus, monthReviewStatus } = this.props;
    return (
      <Fragment>
        <ContentSectionContainer>
          <ContentSectionWrapper>
            <MoolahlahLogo width='20' margin='0 auto 1rem auto' />
            { yearReviewStatus === AnalyticStatusEnum.loading && <LoadingSpinner /> }
            { yearReviewStatus === AnalyticStatusEnum.loaded &&
              <Fragment>
                <GraphTitle>{ `${year} Overview` }</GraphTitle>
                <YearReviewGraph />
              </Fragment>
            }
            { monthReviewStatus === AnalyticStatusEnum.empty && <GraphTitle>No Budget Data For That Month</GraphTitle> }
            { monthReviewStatus === AnalyticStatusEnum.loading && <LoadingSpinner /> }
            { monthReviewStatus === AnalyticStatusEnum.loaded &&
              <Fragment>
                <GraphTitle>{ `${displayMonths[month]} ${year.toString()} Overview` }</GraphTitle>
                <MonthReviewGraph />
              </Fragment>
            }
          </ContentSectionWrapper>
        </ContentSectionContainer>
        <TabContentContainer bgColor='mediumBlue'>
          <TabSelector />
          <YearSelector />
          <OnlyMonthSelector />
        </TabContentContainer>
      </Fragment>
    );
  }

}

BudgetVisionPage.propTypes = {
  yearReviewStatus: PropTypes.number.isRequired,
  monthReviewStatus: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  dispatchRequestYearReview: PropTypes.func.isRequired,
  dispatchRequestMonthReview: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  yearReviewStatus: state.analytics.yearReviewStatus,
  monthReviewStatus: state.analytics.monthReviewStatus,
  year: state.analytics.year,
  month: state.analytics.month,
});

const mapDispatchToProps = dispatch => ({
  dispatchRequestYearReview: year => dispatch(requestYearReview({ year })),
  dispatchRequestMonthReview: ({ year, month }) => dispatch(requestMonthReview({ year, month })),
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetVisionPage);

const GraphTitle = styled.p`
  font-size: 4rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.darkBlue};
  font-weight: 700;
  font-family: ${({ theme }) => theme.typeFont};
  text-align: center;
`;