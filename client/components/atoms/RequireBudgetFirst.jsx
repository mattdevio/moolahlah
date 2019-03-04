// Vendor Imports
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

// Custom Imports
import * as routes from '@/constants/routes';

const RequireBudgetFirst = () => (
  <RBFContainer>
    <EmptyIcon />
    <Heading>
      No Budget Started
    </Heading>
    <HelpMessage>
      You must create a budget for the selected month / year before attempting to add a transaction. Please visit the budget designer to start a new budget first.
    </HelpMessage>
    <GotoBudgetDesigner to={ routes.DASHBOARD_BUDGET_DESIGN }>
      Goto Budget Designer
    </GotoBudgetDesigner>
  </RBFContainer>
);

export default RequireBudgetFirst;

const RBFContainer = styled.div`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.mediumBlue};
`;

const Heading = styled.h1`
  ${({ theme }) => `
    color: ${theme.mediumBlue};
    font-family: ${theme.typeFont};
    letter-spacing: 0.2rem;
    font-size: 5rem;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
  `}
`;

const EmptyIcon = styled(FontAwesomeIcon).attrs({ icon: 'times' })`
  font-size: 10rem;
  width: 10rem;
  display: block;
  margin: 0 auto;
  color: ${({ theme }) => theme.mediumBlue};
`;

const HelpMessage = styled.p`
  ${({ theme }) => `
    color: ${theme.mediumBlue};
    font-family: ${theme.typeFont};
    letter-spacing: 0.1rem;
    font-size: 2rem;
    text-align: center;
  `}
`;

const GotoBudgetDesigner = styled(NavLink)`
  display: block;
  width: 100%;
  background-color: ${({ theme }) => theme.mediumBlue};
  color: ${({ theme }) => theme.white};
  font-family: ${({ theme }) => theme.typeFont};
  font-size: 3rem;
  text-decoration: none;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.3rem;
  margin: 0.5rem 0 0 0;
  padding: 0.3rem;
  cursor: pointer;
  border: 2px solid transparent;
  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.skyBlue};
    outline: 0;
  }
`;