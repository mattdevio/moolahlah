/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

/*----------  Custom Imports  ----------*/
import AuthToggle from './AuthToggle';
import * as routes from '@/constants/routes';

/*==========================================
=            AuthForm PureComponent            =
==========================================*/

class AuthForm extends Component {
  render() {
    return (
      <AuthFormContainer>
        <AuthToggle />
        <Route
          exact
          path={ routes.AUTH_REGISTER }
          render={ () => <h1>register</h1> }
        />
        <Route
          exact
          path={ routes.AUTH_SIGNIN }
          render={ () => <h1>signin</h1> }
        />
      </AuthFormContainer>
    );
  }
}

export default AuthForm;

/*=====  End of AuthForm Component  ======*/

const AuthFormContainer = styled.div`
  box-shadow: 0px 6px 5px 0px rgba(0,0,0,0.5);
  max-width: 40rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;