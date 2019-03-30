// Vendor Imports
import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Custom Imports
import * as routes from '@/constants/routes';
import withAuthorization from '@/bin/hocs/withAuthorization';
import BudgetDesignPage from '@/components/pages/BudgetDesignPage';
import BudgetTransactionPage from '@/components/pages/BudgetTransactionPage';
import BudgetVisionPage from '@/components/pages/BudgetVisionPage';
import AccountPage from '@/components/pages/AccountPage';

/**
 * Dashboard Page
 * Router users to sub-routes
 */
class DashboardPage extends Component {
  render() {
    return (
      <DashboardPageContainer>
        <Helmet>
          <title>Moolahlah Budget App</title>
        </Helmet>
        <Switch>
          <Route
            path={ routes.DASHBOARD_BUDGET_DESIGN }
            component={ BudgetDesignPage }
          />
          <Route
            path={ routes.DASHBOARD_BUDGET_TRANSACTION }
            component={ BudgetTransactionPage }
          />
          <Route
            path={ routes.DASHBOARD_BUBDGET_VISION }
            component={ BudgetVisionPage }
          />
          <Route
            path={ routes.DASHBOARD_ACCOUNT }
            component={ AccountPage }
          />
          <Route
            render={ () => <Redirect to={ routes.DASHBOARD_BUDGET_DESIGN } /> }
          />
        </Switch>
      </DashboardPageContainer>
    );
  }
}

export default withAuthorization(DashboardPage);


const DashboardPageContainer = styled.div`
  height: 100%;
  min-height: 100%;
  position: relative;
`;
