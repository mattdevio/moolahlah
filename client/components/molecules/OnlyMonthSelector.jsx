/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/*----------  Custom imports  ----------*/
import { setMonth } from '@/state/ducks/analytics';

/*===============================================
=            OnlyMonthSelector Component            =
===============================================*/

class OnlyMonthSelector extends Component {

  constructor(props) {
    super(props);
    this.renderMonthButton = this.renderMonthButton.bind(this);
  }

  renderMonthButton(monthAsInt, monthDisplayText, currentMonth) {
    return (
      <MonthButton
        onClick={ () => this.props.dispatchSetMonth(monthAsInt) }
        isSelected={ monthAsInt === currentMonth }
      >
        { monthDisplayText }
      </MonthButton>
    );
  }

  render() {
    const {
      currentMonth,
    } = this.props;
    return (
      <OnlyMonthSelectorContainer>
        <MonthTitle> And Month </MonthTitle>
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
      </OnlyMonthSelectorContainer>
    );
  }
}

OnlyMonthSelector.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  dispatchSetMonth: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentMonth: state.analytics.month,
});

const mapDispatchToProps = dispatch => ({
  dispatchSetMonth: month => dispatch(setMonth({ month })),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnlyMonthSelector);

/*=====  End of OnlyMonthSelector Component  ======*/

const OnlyMonthSelectorContainer = styled.div`
  margin: 1rem 0 0 0;
`;

const MonthTitle = styled.h2`
  font-size: 3rem;
  font-family: ${({ theme }) => theme.typeFont};
  color: ${({ theme }) => theme.skyBlue};
  text-align: center;
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
