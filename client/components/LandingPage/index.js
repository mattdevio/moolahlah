/*----------  Custom Imports  ----------*/
import React, { Component, Fragment } from 'react';
import { Switch } from 'react-router-dom';

/*----------  Custom Imports  ----------*/
import LandingHeader from './LandingHeader';


class LandingPage extends Component {
  render() {
    return (
      <Fragment>
        <LandingHeader />
        { console.log(this.props) }
        <Switch>
          
        </Switch>
      </Fragment>
    );
  }
}

export default LandingPage;
