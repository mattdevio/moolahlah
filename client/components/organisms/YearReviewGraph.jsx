// Vendor Imports
import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLegend, VictoryGroup } from 'victory';
import moment from 'moment';

// Custom Imports

class YearReviewGraph extends Component {

  constructor(props) {
    super(props);
    this.processData = this.processData.bind(this);
    this.parseMoney = this.parseMoney.bind(this);
  }

  parseMoney(money) {
    return +parseFloat(Math.round(+money * 100) / 100).toFixed(2);
  }

  processData() {
    const { yearReview, theme } = this.props;
    const IncomeEstimate = moment.monthsShort().map(monthKey => {
      if (yearReview[monthKey] && yearReview[monthKey].estimate && typeof yearReview[monthKey].estimate.income !== 'undefined') {
        return { x: monthKey, y: this.parseMoney(yearReview[monthKey].estimate.income) };
      }
      return { x: monthKey, y: 0 };
    });

    const DebitEstimate = moment.monthsShort().map(monthKey => {
      if (yearReview[monthKey] && yearReview[monthKey].estimate && typeof yearReview[monthKey].estimate.debit !== 'undefined') {
        return { x: monthKey, y: this.parseMoney(yearReview[monthKey].estimate.debit) };
      }
      return { x: monthKey, y: 0 };
    });

    const ActualIncome = moment.monthsShort().map(monthKey => {
      if (yearReview[monthKey] && yearReview[monthKey].actual && typeof yearReview[monthKey].actual.income !== 'undefined') {
        return { x: monthKey, y: this.parseMoney(yearReview[monthKey].actual.income) };
      }
      return { x: monthKey, y: 0 };
    });

    const ActualDebit = moment.monthsShort().map(monthKey => {
      if (yearReview[monthKey] && yearReview[monthKey].actual && typeof yearReview[monthKey].actual.debit !== 'undefined') {
        return { x: monthKey, y: this.parseMoney(yearReview[monthKey].actual.debit) };
      }
      return { x: monthKey, y: 0 };
    });

    return (
      <VictoryGroup offset={6} colorScale={'qualitative'}>
        <VictoryBar
          data={ IncomeEstimate }
          domain={{ y: [0, 5000] }}
          style={{ data: { fill: theme.skyBlue } }}
        />
        <VictoryBar
          data={ DebitEstimate }
          domain={{ y: [0, 5000] }}
          style={{ data: { fill: theme.darkBlue } }}
        />
        <VictoryBar
          data={ ActualIncome }
          domain={{ y: [0, 5000] }}
          style={{ data: { fill: theme.alertRed } }}
        />
        <VictoryBar
          data={ ActualDebit }
          domain={{ y: [0, 5000] }}
          style={{ data: { fill: theme.alertYellow } }}
        />
      </VictoryGroup>
    );
  }

  render() {
    const { theme } = this.props;
    return (
      <YRGContainer>
        <VictoryChart theme={ VictoryTheme.material } width={600} height={400}>
          <VictoryLegend x={170} y={0}
            orientation='horizontal'
            gutter={20}
            style={{ border: { stroke: '#000' } }}
            colorScale={[ theme.skyBlue, theme.darkBlue, theme.alertRed, theme.alertYellow ]}
            itemsPerRow={2}
            data={[
              { name: 'Income Estimate' }, { name: 'Debit Estimate' }, { name: 'Actual Income' }, { name: 'Actual Debit' }
            ]}
          />
          { this.processData() }
        </VictoryChart>
      </YRGContainer>
    );
  }

}

YearReviewGraph.propTypes = {
  yearReview: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  yearReview: state.analytics.yearReview,
});

export default withTheme(connect(mapStateToProps)(YearReviewGraph));

const YRGContainer = styled.div`
  border: 1px solid #000;
  width: 100%;
  padding: 1rem;
`;