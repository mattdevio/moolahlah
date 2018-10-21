/*----------  Vendor Imports  ----------*/
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*----------  Custom imports  ----------*/
import * as routes from '@/constants/routes';

const TabSelector = () => (
  <TabSelectorContainer>
    <TabButton to={ routes.DASHBOARD_DESIGN } bgcolor='skyBlue'>
      <StyledIcon
        icon='calendar-plus'
      />
    </TabButton>
    <TabButton to={ routes.DASHBOARD_TRANSACTION } bgcolor='lightBlue'>
      <StyledIcon
        icon='feather-alt'
      />
    </TabButton>
    <TabButton to={ routes.DASHBOARD_VISION } bgcolor='mediumBlue'>
      <StyledIcon
        icon='chart-bar'
      />
    </TabButton>
    <TabButton to={ routes.DASHBOARD_ACCOUNT } bgcolor='darkBlue'>
      <StyledIcon
        icon='user'
      />
    </TabButton>
  </TabSelectorContainer>
);

export default TabSelector;

const TabSelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

`;

const TabButton = styled(NavLink).attrs({
  activeClassName: 'active',
  exact: true,
})`
  width: 10rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ bgcolor, theme }) => theme[bgcolor]};
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 4rem;
  color: ${({ theme }) => theme.white};
`;
