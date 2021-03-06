/*----------  Vendor Imports  ----------*/
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/*----------  Custom imports  ----------*/
import FloatingInput from '@/components/atoms/FloatingInput';
import {
  setRegisterName,
  setRegisterEmail,
  setRegisterPassword,
  submitRegisterForm,
} from '@/state/ducks/auth';

/*====================================
=            RegisterForm            =
====================================*/

class RegisterForm extends PureComponent {

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
      name,
      email,
      password,
      nameError,
      emailError,
      passwordError,
      updateName,
      updateEmail,
      updatePassword,
    } = this.props;
    return (
      <RegisterFormContainer onSubmit={ this.runSubmit } noValidate>
        <SpacedFloatingInput
          type='text'
          textLabel='Full Name'
          errorMessage={ nameError }
          value={ name }
          onChange={ updateName }
        />
        <SpacedFloatingInput
          type='text'
          textLabel='Email'
          errorMessage={ emailError }
          value={ email }
          onChange={ updateEmail }
        />
        <SpacedFloatingInput
          type='password'
          textLabel='Password'
          errorMessage={ passwordError }
          value={ password }
          onChange={ updatePassword }
        />
        <RegisterButton>
          Create Your Free Account
        </RegisterButton>
      </RegisterFormContainer>
    );
  }
}

RegisterForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  nameError: PropTypes.string.isRequired,
  emailError: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  name: state.auth.registerName,
  email: state.auth.registerEmail,
  password: state.auth.registerPassword,
  nameError: state.auth.registerName_Error,
  emailError: state.auth.registerEmail_Error,
  passwordError: state.auth.registerPassword_Error,
});

const mapDispatchToProps = dispatch => ({
  updateName: name => dispatch(setRegisterName(name)),
  updateEmail: email => dispatch(setRegisterEmail(email)),
  updatePassword: password => dispatch(setRegisterPassword(password)),
  submitForm: () => dispatch(submitRegisterForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

/*=====  End of RegisterForm  ======*/

const RegisterFormContainer = styled.form`
  display: block;
  padding: 3rem;
`;

const SpacedFloatingInput = styled(FloatingInput)`
  margin-bottom: 1rem;
`;

const RegisterButton = styled.button`
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
  border: 2px solid ${({ theme }) => theme.darkBlue};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.skyBlue};
  }
`;
