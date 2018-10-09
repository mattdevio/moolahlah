/*----------  Vendor Imports  ----------*/
import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/*----------  Custom Imports  ----------*/
import withWindowEvents from '@/hocs/withWindowEvents';
import * as routes from '@/constants/routes';
import LandingPage from '@/screens/LandingPage';
import './iconLibrary';


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
          <Route render={ () => <Redirect to={ routes.AUTH_REGISTER } /> } />
        </Switch>
      </Fragment>
    );
  }

}

export default withWindowEvents(App);

/*=====  End of App  ======*/
