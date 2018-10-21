/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*----------  Custom imports  ----------*/


class MonthSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedState: 0,
      year: 2018,
    };
    this.renderMonthButton = this.renderMonthButton.bind(this);
  }

  renderMonthButton(monthInt, monthDisplay) {
    return (
      <MonthButton onClick={ () => {
        this.setState({
          selectedState: monthInt,
        });
      }} isSelected={ monthInt === this.state.selectedState }>
        { monthDisplay }
      </MonthButton>
    );
  }

  render() {
    return (
      <MonthSelectorContainer>
        <YearRow>
          <StyledIcon icon='chevron-circle-left' onClick={() => {
            this.setState({
              year: (this.state.year - 1),
            });
          }} />
          <CurrentYear>
            { this.state.year.toString() }
          </CurrentYear>
          <StyledIcon icon='chevron-circle-right' onClick={() => {
            this.setState({
              year: (this.state.year + 1)
            });
          }} />
        </YearRow>
        <MonthGroup>
          <MonthRow>
            { this.renderMonthButton(0, 'JAN') }
            { this.renderMonthButton(1, 'FEB') }
            { this.renderMonthButton(2, 'MAR') }
          </MonthRow>
          <MonthRow>
            { this.renderMonthButton(3, 'APR') }
            { this.renderMonthButton(4, 'MAY') }
            { this.renderMonthButton(5, 'JUN') }
          </MonthRow>
          <MonthRow>
            { this.renderMonthButton(6, 'JUL') }
            { this.renderMonthButton(7, 'AUG') }
            { this.renderMonthButton(8, 'SEP') }
          </MonthRow>
          <MonthRow>
            { this.renderMonthButton(9, 'OCT') }
            { this.renderMonthButton(10, 'NOV') }
            { this.renderMonthButton(11, 'DEC') }
          </MonthRow>
        </MonthGroup>
      </MonthSelectorContainer>
    );
  }
}

export default MonthSelector;


const MonthSelectorContainer = styled.div`

`;

const YearRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 0;
  color: ${({ theme }) => theme.darkBlue};
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
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.white};
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
  },
`;
