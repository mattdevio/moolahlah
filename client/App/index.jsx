/*----------  Vendor Imports  ----------*/
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

/*----------  Custom Imports  ----------*/
import { Header } from '@/components';
import * as routes from '@/constants/routes';
import { Landing } from '@/screens';
import { moolahlahTheme } from '@/App/styled_theme';

/*===========================
=            App            =
===========================*/

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={ moolahlahTheme }>
        <Router>
          <Fragment>
            <Header />
            <Switch>
              <Route exact path={ routes.LANDING } component={ Landing } />
              <Route
                render={ () => <Redirect to={ routes.LANDING } /> }
              />
            </Switch>
          </Fragment>
        </Router>
      </ThemeProvider>
    );
  }

}

export default App;

/*=====  End of App  ======*/
