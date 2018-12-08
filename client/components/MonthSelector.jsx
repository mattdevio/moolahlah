/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { number, func } from 'prop-types';

/*----------  Custom imports  ----------*/
import {
  setCurrentYear,
  setCurrentMonth,
} from '@/state/ducks/design';

/*===============================================
=            MonthSelector Component            =
===============================================*/

class MonthSelector extends Component {

  constructor(props) {
    super(props);
    this.renderMonthButton = this.renderMonthButton.bind(this);
  }

  renderMonthButton(monthAsInt, monthDisplayText, currentMonth) {
    return (
      <MonthButton
        onClick={ () => this.props.setCurrentMonth(monthAsInt) }
        isSelected={ monthAsInt === currentMonth }
      >
        { monthDisplayText }
      </MonthButton>
    );
  }

  render() {
    const {
      currentYear,
      currentMonth,
      setCurrentYear,
    } = this.props;
    return (
      <div>
        <YearRow>
          <StyledIcon
            icon='chevron-circle-left'
            onClick={ () => setCurrentYear(currentYear - 1) }
          />
          <CurrentYear>
            { currentYear.toString() }
          </CurrentYear>
          <StyledIcon
            icon='chevron-circle-right'
            onClick={ () => setCurrentYear(currentYear + 1) }
          />
        </YearRow>
        <MonthGroup>
          <MonthRow>
            { this.renderMonthButton(0, 'JAN', currentMonth) }
            { this.renderMonthButton(1, 'FEB', currentMonth) }
            { this.renderMonthButton(2, 'MAR', currentMonth) }
          </MonthRow>
          <MonthRow>
            { this.renderMonthButton(3, 'APR', currentMonth) }
            { this.renderMonthButton(4, 'MAY', currentMonth) }
            { this.renderMonthButton(5, 'JUN', currentMonth) }
          </MonthRow>
          <MonthRow>
            { this.renderMonthButton(6, 'JUL', currentMonth) }
            { this.renderMonthButton(7, 'AUG', currentMonth) }
            { this.renderMonthButton(8, 'SEP', currentMonth) }
          </MonthRow>
          <MonthRow>
            { this.renderMonthButton(9, 'OCT', currentMonth) }
            { this.renderMonthButton(10, 'NOV', currentMonth) }
            { this.renderMonthButton(11, 'DEC', currentMonth) }
          </MonthRow>
        </MonthGroup>
      </div>
    );
  }
}

MonthSelector.propTypes = {
  currentYear: number.isRequired,
  currentMonth: number.isRequired,
  setCurrentYear: func.isRequired,
  setCurrentMonth: func.isRequired,
};

const mapStateToProps = state => ({
  currentYear: state.design.currentYear,
  currentMonth: state.design.currentMonth,
});

const mapDispatchToProps = dispatch => ({
  setCurrentYear: currentYear => dispatch(setCurrentYear(currentYear)),
  setCurrentMonth: currentMonth => dispatch(setCurrentMonth(currentMonth)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelector);

/*=====  End of MonthSelector Component  ======*/



const YearRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.darkBlue};
  margin-bottom: 0.5rem;
`;

const CurrentYear = styled.span`
  font-size: 3rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.typeFont};
  margin: 0 auto;
`;

const StyledIcon = styled(FontAwesomeIcon).attrs({
  tabIndex: 0,
})`
  width: 3rem;
  height: 3rem;
  font-size: 3rem;
  cursor: pointer;
  margin: 0 2rem;
  color: ${({ theme }) => theme.darkBlue};
  &:hover {
    color: ${({ theme }) => theme.white};
  }
  &:focus {
    outline: none;
  }
`;

const MonthGroup = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.darkBlue};
`;

const MonthRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MonthButton = styled.button.attrs({
  tabIndex: 0,
})`
  width: 33.3333%;
  padding: 1rem 0;
  background: ${({ isSelected, theme }) => isSelected ? theme.lightBlue : 'transparent'};
  color: ${({ isSelected, theme }) => isSelected ? theme.white : theme.skyBlue};
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  font-family: ${({ theme }) => theme.typeFont};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.black};
  &:hover,
  &:focus {
    background: ${({ isSelected, theme }) => isSelected ? theme.lightBlue : theme.white};
    color: ${({ isSelected, theme }) => isSelected ? theme.white: theme.darkBlue};
    outline: none;
  },
`;
