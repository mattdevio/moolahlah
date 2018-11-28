/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { string } from 'prop-types';

/*----------  Custom Imports  ----------*/
import { AUTH_SIGNIN } from '@/constants/routes';

/**
 * withAuthorization
 * HOC that only renders a page if the user is authenticated
 * Otherwise redirect user to login
 */
const withAuthorization = ScreenPage => {
  class WithAuthorization extends Component {
    render() {
      const { authenticatedUser } = this.props;
      return authenticatedUser ? <ScreenPage /> : <Redirect to={ AUTH_SIGNIN } />;
    }
  }

  WithAuthorization.propTypes = {
    authenticatedUser: string.isRequired,
  };

  const mapStateToProps = state => ({
    authenticatedUser: state.auth.authenticatedUser.email,
  });

  return connect(mapStateToProps)(WithAuthorization);
};

export default withAuthorization;
