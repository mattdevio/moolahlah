/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';

/*----------  Custom Imports  ----------*/
import AuthToggle from './AuthToggle';
import RegisterForm from './RegisterForm';
import SigninForm from './SigninForm';
import * as routes from '@/constants/routes';

/*==========================================
=            ComboAuthBox PureComponent            =
==========================================*/

class ComboAuthBox extends Component {
  render() {
    return (
      <ComboAuthBoxContainer>
        <AuthToggle />
        <Switch>
          <Route
            exact
            path={ routes.AUTH_REGISTER }
            component={ RegisterForm }
          />
          <Route
            exact
            path={ routes.AUTH_SIGNIN }
            component={ SigninForm }
          />
          <Route
            render={ () => <Redirect to={ routes.AUTH_SIGNIN } /> }
          />
        </Switch>
      </ComboAuthBoxContainer>
    );
  }
}

export default ComboAuthBox;

/*=====  End of ComboAuthBox Component  ======*/

const ComboAuthBoxContainer = styled.div`
  box-shadow: 0px 6px 5px 0px rgba(0,0,0,0.5);
  max-width: 40rem;
  width: 100%;
  display: block;
`;
