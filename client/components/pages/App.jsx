/*----------  Vendor Imports  ----------*/
import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*----------  Custom Imports  ----------*/
import bootstrapApp from '@/bin/hocs/bootstrapApp';
import * as routes from '@/constants/routes';
import LandingPage from '@/components/pages/LandingPage';
import DashboardPage from '@/components/pages/DashboardPage';
import '@/bin/iconLibrary';


/*===========================
=            App            =
===========================*/

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Switch>
          <Route path={ routes.AUTH } component={ LandingPage } />
          <Route path={ routes.DASHBOARD } component={ DashboardPage } />
          <Route render={ () => <Redirect to={ routes.AUTH_REGISTER } /> } />
        </Switch>
        <ToastContainer
          style={{ boxSizing: 'border-box', fontSize: '1.4rem' }}
          autoClose={ false }
        />
      </Fragment>
    );
  }

}

export default bootstrapApp(App);

/*=====  End of App  ======*/
