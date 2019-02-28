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
import YearSelector from '@/components/molecules/YearSelector';
import {
  AnalyticStatusEnum,
  requestYearReview,
} from '@/state/ducks/analytics';

class BudgetVisionPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { status, year, dispatchRequestYearReview } = this.props;
    if (status === AnalyticStatusEnum.empty) {
      dispatchRequestYearReview(year);
    }
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

BudgetVisionPage.propTypes = {
  status: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  dispatchRequestYearReview: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: state.analytics.status,
  year: state.analytics.year,
});

const mapDispatchToProps = dispatch => ({
  dispatchRequestYearReview: year => dispatch(requestYearReview({ year })),
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetVisionPage);
