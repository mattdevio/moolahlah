/*----------  Vendor Imports  ----------*/
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/*----------  Custom imports  ----------*/
import FloatingInput from '@/components/FloatingInput';
import {
  setSigninEmail,
  setSigninPassword,
  submitSigninForm,
} from '@/state/ducks/auth';

/*==================================
=            SigninForm            =
==================================*/

class SigninForm extends PureComponent {

  constructor(props) {
    super(props);
    this.runSubmit = this.runSubmit.bind(this);
  }

  runSubmit(event) {
    event.preventDefault();
    this.props.submitForm();
  }

  render() {
    const {
      email,
      password,
      updateEmail,
      updatePassword,
      emailError,
      passwordError,
    } = this.props;
    return (
      <SigninFormContainer onSubmit={ this.runSubmit } noValidate>
        <SpacedFloatingInput
          type='text'
          textLabel='Email'
          value={ email }
          errorMessage={ emailError }
          onChange={ updateEmail }
        />
        <SpacedFloatingInput
          type='password'
          textLabel='Password'
          value={ password }
          errorMessage={ passwordError }
          onChange={ updatePassword }
        />
        <SigninButton>Sign In</SigninButton>
      </SigninFormContainer>
    );
  }
}

SigninForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  emailError: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  email: state.auth.signinEmail,
  password: state.auth.signinPassword,
  emailError: state.auth.signinEmail_Error,
  passwordError: state.auth.signinPassword_Error
});

const mapDispatchToProps = dispatch => ({
  updateEmail: email => dispatch(setSigninEmail(email)),
  updatePassword: password => dispatch(setSigninPassword(password)),
  submitForm: () => dispatch(submitSigninForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);

/*=====  End of SigninForm  ======*/

const SigninFormContainer = styled.form`
  display: block;
  padding: 3rem;
`;

const SpacedFloatingInput = styled(FloatingInput)`
  margin-bottom: 1rem;
`;

const SigninButton = styled.button`
  border: none;
  background: linear-gradient(
    ${({ theme }) => `${theme.lightBlue}, ${theme.darkBlue}`}
  );
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typeFont};
  font-size: 2rem;
  letter-spacing: 0.2rem;
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
`;
