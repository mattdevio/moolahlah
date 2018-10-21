/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*----------  Custom imports  ----------*/


class MonthSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedState: 'JAN',
      year: 2018,
    };
    this.renderMonthButton = this.renderMonthButton.bind(this);
  }

  renderMonthButton(month) {
    return (
      <MonthButton onClick={ () => {
        this.setState({
          selectedState: month,
        });
      }} isSelected={ month === this.state.selectedState }>
        { month }
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
            { this.renderMonthButton('JAN') }
            { this.renderMonthButton('FEB') }
            { this.renderMonthButton('MAR') }
          </MonthRow>
          <MonthRow>
            { this.renderMonthButton('APR') }
            { this.renderMonthButton('MAY') }
            { this.renderMonthButton('JUN') }
          </MonthRow>
          <MonthRow>
            { this.renderMonthButton('JUL') }
            { this.renderMonthButton('AUG') }
            { this.renderMonthButton('SEP') }
          </MonthRow>
          <MonthRow>
            { this.renderMonthButton('OCT') }
            { this.renderMonthButton('NOV') }
            { this.renderMonthButton('DEC') }
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
