// Vendor Imports
import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryAxis, VictoryGroup, VictoryLegend } from 'victory';

// Custom Imports

class MonthReviewGraph extends Component {

  constructor(props) {
    super(props);
    this.processData = this.processData.bind(this);
    this.parseMoney = this.parseMoney.bind(this);
  }

  parseMoney(money) {
    return +parseFloat(Math.round(+money * 100) / 100).toFixed(2);
  }

  processData() {
    
    const { monthReview, theme } = this.props;

    const plannedData = Object.keys(monthReview).map(key => {
      return {
        x: monthReview[key].label,
        y: this.parseMoney(monthReview[key].planned),
      };
    });

    const actualData = Object.keys(monthReview).map(key => {
      return {
        x: monthReview[key].label,
        y: this.parseMoney(monthReview[key].actual),
      };
    });

    return (
      <VictoryGroup horizontal
        offset={10}
        style={{ data: { width: 6 } }}
      >
        <VictoryBar
          data={plannedData}
          barWidth={ 10 }
          style={{ data: { fill: theme.skyBlue } }}
        />
        <VictoryBar
          data={actualData}
          barWidth={ 10 }
          style={{ data: { fill: theme.darkBlue } }}
        />
      </VictoryGroup>
    );
  }

  render() {
    const { theme } = this.props;
    return (
      <YRGContainer>
        <VictoryChart
          theme={ VictoryTheme.material }
          width={600}
          height={400}
          domain={{y: [0, 5000]}}
        >
          <VictoryLegend x={220} y={10}
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: 'transparent' } }}
            colorScale={[ theme.skyBlue, theme.darkBlue ]}
            data={[
              { name: 'Planned' }, { name: 'Actual' },
            ]}
          />
          <VictoryAxis style={{ tickLabels: { angle: -60, fontSize: 7 } }} />
          <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 7 } }} />
          { this.processData() }
        </VictoryChart>
      </YRGContainer>
    );
  }

}

MonthReviewGraph.propTypes = {
  monthReview: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  monthReview: state.analytics.monthReview,
});

export default withTheme(connect(mapStateToProps)(MonthReviewGraph));

const YRGContainer = styled.div`
  border: 1px solid #000;
  width: 100%;
  padding: 1rem;
`;