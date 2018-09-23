/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*----------  Custom Imports  ----------*/
import AuthInputBox from './AuthInputBox';
import {
  setSignUpFields,
  signUpUser,
} from '@/state/ducks/auth';

/*========================================
=            AuthenticationBox Component            =
========================================*/

class AuthenticationBox extends Component {
  render() {
    const {
      name,
      email,
      password,
      updateSignUpName,
      updateSignUpEmail,
      updateSignUpPassword,
      startSignupUser,
    } = this.props;
    return (
      <AuthenticationBoxContainer>
        <AuthInputBox
          iconName='user'
          placeHolder='Name'
          inputType='text'
          value={ name }
          onChange={ updateSignUpName }
        />
        <AuthInputBox
          iconName='at'
          placeHolder='Email'
          inputType='text'
          value={ email }
          onChange={ updateSignUpEmail }
        />
        <AuthInputBox
          iconName='key'
          placeHolder='Password'
          inputType='password'
          value={ password }
          onChange={ updateSignUpPassword }
        />
        <ErrorMessage>
          <FontAwesomeIcon icon='exclamation-triangle' />
          All fields are required to start an account!
        </ErrorMessage>
        <SubmitButton onClick={ startSignupUser }>
          Start Account
        </SubmitButton>
      </AuthenticationBoxContainer>
    );
  }
}

AuthenticationBox.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  updateSignUpName: PropTypes.func.isRequired,
  updateSignUpEmail: PropTypes.func.isRequired,
  updateSignUpPassword: PropTypes.func.isRequired,
  startSignupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.auth.signUpName,
  email: state.auth.signUpEmail,
  password: state.auth.signUpPassword,
});

const mapDispatchToProps = (dispatch) => ({
  updateSignUpName: (signUpName) => dispatch(setSignUpFields({signUpName})),
  updateSignUpEmail: (signUpEmail) => dispatch(setSignUpFields({signUpEmail})),
  updateSignUpPassword: (signUpPassword) => dispatch(setSignUpFields({signUpPassword})),
  startSignupUser: () => dispatch(signUpUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationBox);

/*=====  End of AuthenticationBox Component  ======*/


const AuthenticationBoxContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 35rem;
  padding: 1.5rem;
  > * {
    margin-bottom: 0.5rem;
  }
`;

const SubmitButton = styled.button`
  height: 3.8rem;
  font-size: 2.5rem;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.mediumBlue};
  color: #fff;
  font-family: ${({ theme }) => theme.typeFont};
  border-radius: 2.5rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 0 0 ${({ theme }) => theme.lightBlue};
  &:focus {
    outline: none;
  }
  &:hover,
  &:focus {
    box-shadow: 0 0 1rem ${({ theme }) => theme.lightBlue};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.alertColor};
  font-family: ${({ theme }) => theme.typeFont};
  text-align: center;
  font-weight: 700;
  font-size: 1.8rem;
  padding: 0;
  margin: 1rem 0;
  > svg {
    margin-right: 0.5rem;
  }
`;



