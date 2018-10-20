/*----------  Vendor Imports  ----------*/
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

/*----------  Custom imports  ----------*/
import * as routes from '@/constants/routes';

const TabSelector = () => (
  <TabSelectorContainer>
    <TabButton to={ routes.DASHBOARD_DESIGN }>
      DESIGN
    </TabButton>
    <TabButton to={ routes.DASHBOARD_TRANSACTION }>
      TRANSACTION
    </TabButton>
    <TabButton to={ routes.DASHBOARD_VISION }>
      VISION
    </TabButton>
    <TabButton to={ routes.DASHBOARD_ACCOUNT }>
      ACCOUNT
    </TabButton>
  </TabSelectorContainer>
);

export default TabSelector;

const TabSelectorContainer = styled.div`
  display: block;
  width: 100%;
`;

const TabButton = styled(NavLink).attrs({
  activeClassName: 'active',
  exact: true,
})`
  width: 10rem;
  height: 10rem;
  display: inline-block;
  border: 1px solid #000;
`;
