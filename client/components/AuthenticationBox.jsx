/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

/*----------  Custom Imports  ----------*/
import AuthInputBox from './AuthInputBox';
import {
  signUpName,
  signUpEmail,
  signUpPassword,
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
      nameError,
      emailError,
      passwordError,
      updateSignUpName,
      updateSignUpEmail,
      updateSignUpPassword,
      startSignupUser,
    } = this.props;
    return (
      <AuthenticationBoxContainer onSubmit={e => e.preventDefault()}>
        <AuthInputBox
          iconName='user'
          placeHolder='Name'
          inputType='text'
          value={ name }
          onChange={ updateSignUpName }
          error={ nameError }
        />
        <AuthInputBox
          iconName='at'
          placeHolder='Email'
          inputType='text'
          value={ email }
          onChange={ updateSignUpEmail }
          error={ emailError }
        />
        <AuthInputBox
          iconName='key'
          placeHolder='Password'
          inputType='password'
          value={ password }
          onChange={ updateSignUpPassword }
          error={ passwordError }
        />
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
  nameError: PropTypes.string.isRequired,
  emailError: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired,
  updateSignUpName: PropTypes.func.isRequired,
  updateSignUpEmail: PropTypes.func.isRequired,
  updateSignUpPassword: PropTypes.func.isRequired,
  startSignupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.auth.signUpName,
  email: state.auth.signUpEmail,
  password: state.auth.signUpPassword,
  nameError: state.auth.errorSignUpName,
  emailError: state.auth.errorSignUpEmail,
  passwordError: state.auth.errorSignUpPassword,
});

const mapDispatchToProps = (dispatch) => ({
  updateSignUpName: (name) => dispatch(signUpName(name)),
  updateSignUpEmail: (email) => dispatch(signUpEmail(email)),
  updateSignUpPassword: (password) => dispatch(signUpPassword(password)),
  startSignupUser: () => dispatch(signUpUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationBox);

/*=====  End of AuthenticationBox Component  ======*/


const AuthenticationBoxContainer = styled.form`
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
  padding: 0;
  &:focus {
    outline: none;
  }
  &:hover,
  &:focus {
    box-shadow: 0 0 1rem ${({ theme }) => theme.lightBlue};
  }
`;
