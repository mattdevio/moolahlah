/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { number, func } from 'prop-types';

/*----------  Custom imports  ----------*/
import { setYear } from '@/state/ducks/analytics';

/*===============================================
=            YearSelector Component            =
===============================================*/

class YearSelector extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      year,
      dispatchSetYear,
    } = this.props;
    return (
      <YearSelectorContainer>
        <Title>
          Select A Year To Review
        </Title>
        <YearRow>
          <StyledIcon
            icon='chevron-circle-left'
            onClick={ () => dispatchSetYear(year - 1) }
          />
          <CurrentYear>
            { year.toString() }
          </CurrentYear>
          <StyledIcon
            icon='chevron-circle-right'
            onClick={ () => dispatchSetYear(year + 1) }
          />
        </YearRow>
      </YearSelectorContainer>
    );
  }
}

YearSelector.propTypes = {
  year: number.isRequired,
  dispatchSetYear: func.isRequired,
};

const mapStateToProps = state => ({
  year: state.analytics.year,
});

const mapDispatchToProps = dispatch => ({
  dispatchSetYear: year => dispatch(setYear({ year })),
});

export default connect(mapStateToProps, mapDispatchToProps)(YearSelector);

/*=====  End of YearSelector Component  ======*/

const YearSelectorContainer = styled.div`
  margin: 2rem 0 0 0;
`;

const Title = styled.h3`
  margin: 0 0 1rem 0;
  padding: 0;
  font-size: 3rem;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.1rem;
  color: ${({ theme }) => theme.skyBlue};
  font-family: ${({ theme }) => theme.typeFont};
`;

const YearRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.skyBlue};
  margin-bottom: 0.5rem;
`;

const CurrentYear = styled.span`
  font-size: 3rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.typeFont};
  margin: 0 2rem;
`;

const StyledIcon = styled(FontAwesomeIcon).attrs({
  tabIndex: 0,
})`
  width: 3rem;
  height: 3rem;
  font-size: 3rem;
  cursor: pointer;
  margin: 0 2rem;
  color: ${({ theme }) => theme.skyBlue};
  &:hover {
    color: ${({ theme }) => theme.white};
  }
  &:focus {
    outline: none;
  }
`;
