/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*----------  Custom imports  ----------*/


class MonthSelector extends Component {
  render() {
    return (
      <MonthSelectorContainer>
        <YearRow>
          <StyledIcon icon='chevron-circle-left' />
          <CurrentYear>
            { '2018' }
          </CurrentYear>
          <StyledIcon icon='chevron-circle-right' />
        </YearRow>
        <MonthGroup>

        </MonthGroup>
      </MonthSelectorContainer>
    );
  }
}

export default MonthSelector;


const MonthSelectorContainer = styled.div`
  border: 1px solid #FFF;
`;

const YearRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 0;
`;

const CurrentYear = styled.span`
  font-size: 3rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.typeFont};
  margin: 0 auto;
`;

const StyledIcon = styled(FontAwesomeIcon).attrs({
  tabIndex: '-1',
})`
  width: 3rem;
  height: 3rem;
  font-size: 3rem;
  cursor: pointer;
  margin: 0 2rem;
  color: ${({ theme }) => theme.black};
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.white};
  }
`;

const MonthGroup = styled.div`
  min-height: 30rem;
  width: 100%;
  background-color: ${({ theme }) => theme.darkBlue};
`;
