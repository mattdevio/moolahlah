// Vendor Imports
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Custom Imports
import { displayMonths } from '@/bin/dateHelpers';


const CurrentBudgetDisplay = ({ currentMonth, currentYear, }) => (
  <CBD>
    { `${displayMonths[currentMonth]} ${currentYear}` }
  </CBD>
);

const mapStateToProps = state => ({
  currentMonth: state.budget.currentMonth,
  currentYear: state.budget.currentYear,
});

CurrentBudgetDisplay.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(CurrentBudgetDisplay);

const CBD = styled.h2`
  font-size: 5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  display: block;
  text-align: center;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.mediumBlue};
  font-family: ${({ theme }) => theme.typeFont};
`;