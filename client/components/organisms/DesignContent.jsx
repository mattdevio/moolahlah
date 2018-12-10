/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { number, string } from 'prop-types';

/*----------  Custom imports  ----------*/
import MoolahlahLogo from '@/components/atoms/MoolahlahLogo';
import StartNewMonth from '@/components/molecules/StartNewMonth';

/*=====================================
=            DesignContent            =
=====================================*/

class DesignContent extends Component {
  render() {
    const { currentMonthDisplay, currentYear } = this.props;
    return (
      <DesignContentSection>
        <MoolahlahLogo width='20' margin='0 auto 0 auto' />
        <CurrentBudgetMonth>
          { `${currentMonthDisplay} ${currentYear}` }
        </CurrentBudgetMonth>
        <StartNewMonth />
      </DesignContentSection>
    );
  }
}

DesignContent.propTypes = {
  currentMonthDisplay: string.isRequired,
  currentYear: number.isRequired,
};

const mapStateToProps = state => ({
  currentMonthDisplay: state.design.currentMonthDisplay,
  currentYear: state.design.currentYear,
});

export default connect(mapStateToProps)(DesignContent);

/*=====  End of DesignContent  ======*/


const DesignContentSection = styled.div`

`;

const CurrentBudgetMonth = styled.h3`
  font-size: 4.5rem;
  font-weight: 700;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typeFont};
  color: ${({ theme }) => theme.darkBlue};
  text-align: center;
  margin: 0 0 2rem 0;
  letter-spacing: 0.4rem;
`;
