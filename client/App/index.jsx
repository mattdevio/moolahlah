/*----------  Vendor Imports  ----------*/
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

/*----------  Custom Imports  ----------*/
import windowEvents from './windowEvents';
import { moolahlahTheme } from '@/App/styled_theme';
import * as routes from '@/constants/routes';
import { LandingPage } from '@/components';

/*===========================
=            App            =
===========================*/

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={ moolahlahTheme }>
        <Router>
          <Fragment>
            <Switch>
              <Route path={ routes.LANDING_PAGE } component={ LandingPage } />
            </Switch>
          </Fragment>
        </Router>
      </ThemeProvider>
    );
  }

}

export default windowEvents(App);

/*=====  End of App  ======*/
