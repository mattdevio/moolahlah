/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { number } from 'prop-types';

/*----------  Custom imports  ----------*/
import { displayMonths } from '@/bin/dateHelpers';

/*===============================================
=            StartNewMonth Component            =
===============================================*/

class StartNewMonth extends Component {
  render() {
    const { currentMonth } = this.props;
    return (
      <StartNewMonthContainer>
        <NewMonthHeadline>
          Nothing Here Yet...
        </NewMonthHeadline>
        <StartNewMonthButton>
          { `Start ${displayMonths[currentMonth]}'s Budget` }
        </StartNewMonthButton>
      </StartNewMonthContainer>
    );
  }
}

StartNewMonth.propTypes = {
  currentMonth: number.isRequired,
};

const mapStateToProps = state => ({
  currentMonth: state.budget.currentMonth,
});

export default connect(mapStateToProps)(StartNewMonth);

/*=====  End of StartNewMonth Component  ======*/


const StartNewMonthContainer = styled.div`
  padding: 1.5rem;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
  max-width: 50rem;
  margin: 0 auto;
`;

const NewMonthHeadline = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 4rem;
  letter-spacing: 0.3rem;
  font-family: ${({ theme }) => theme.typeFont};
  color: ${({ theme }) => theme.darkBlue};
  text-transform: uppercase;
  text-align: center;
`;

const StartNewMonthButton = styled.button`
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
