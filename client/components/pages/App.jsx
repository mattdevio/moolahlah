/*----------  Vendor Imports  ----------*/
import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/lib/style.css';

/*----------  Custom Imports  ----------*/
import bootstrapApp from '@/bin/hocs/bootstrapApp';
import * as routes from '@/constants/routes';
import LandingPage from '@/components/pages/LandingPage';
import DashboardPage from '@/components/pages/DashboardPage';
import { LineDayPickerStyles } from '@/components/atoms/LineDayPicker';
import '@/bin/iconLibrary';


/*===========================
=            App            =
===========================*/

class App extends Component {

  render() {
    return (
      <Fragment>
        <LineDayPickerStyles />
        <Switch>
          <Route path={ routes.AUTH_BASE } component={ LandingPage } />
          <Route path={ routes.DASHBOARD_BASE } component={ DashboardPage } />
          <Route render={ () => <Redirect to={ routes.AUTH_SIGNIN } /> } />
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
