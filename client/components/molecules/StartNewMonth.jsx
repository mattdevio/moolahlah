// Vendor Imports
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { number } from 'prop-types';

// Custom Imports
import { displayMonths } from '@/bin/dateHelpers';


class StartNewMonth extends Component {
  render() {
    const { currentMonth, currentYear } = this.props;
    return (
      <StartNewMonthContainer>
        <WelcomeTitle>Welcome to the budget designer!</WelcomeTitle>
        <WelcomeDirections>
          This tool is used to help you plan and predict your monthly expenses. In this area, you will itemize your budget by breaking down each expense into categoriezed groups. These categorized groups will not only help you gain insight into your spending, but serve as a blueprint; which gives you an outline of possible expenses you might overlooked. When you are ready to start planning your budget for this month, press the button below!
        </WelcomeDirections>
        <StartBudgetButton>Start Planning for {displayMonths[currentMonth]} {currentYear}</StartBudgetButton>
      </StartNewMonthContainer>
    );
  }
}

StartNewMonth.propTypes = {
  currentMonth: number.isRequired,
  currentYear: number.isRequired,
};

const mapStateToProps = state => ({
  currentMonth: state.budget.currentMonth,
  currentYear: state.budget.currentYear,
});

export default connect(mapStateToProps)(StartNewMonth);

const StartNewMonthContainer = styled.div`
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
  width: 100%;
  padding: 1.5rem;
`;

const WelcomeTitle = styled.h2`
  padding: 0;
  margin: 0 0 1rem 0;
  font-size: 3.5rem;
  text-align: center;
  font-family: ${({theme}) => theme.typeFont};
  letter-spacing: 0.2rem;
`;

const WelcomeDirections = styled.p`
  padding: 0;
  margin: 0 0 1rem 0;
  font-family: ${({theme}) => theme.typeFont};
  font-size: 2.2rem;
  line-height: 3.5rem;
`;

const StartBudgetButton = styled.button`
  border: none;
  background: linear-gradient(
    ${({ theme }) => `${theme.lightBlue}, ${theme.darkBlue}`}
  );
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typeFont};
  font-size: 2rem;
  letter-spacing: 0.2rem;
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.darkBlue};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.skyBlue};
  }
`;