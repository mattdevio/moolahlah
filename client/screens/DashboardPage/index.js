/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';

/*----------  Custom imports  ----------*/
import withAuthorization from '@/hocs/withAuthorization';

class DashboardPage extends Component {
  render() {
    return (
      <h1>Welcome to your dashboard, there is nothing here yet.</h1>
    );
  }
}

export default withAuthorization(DashboardPage);
