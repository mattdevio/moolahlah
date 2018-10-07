/*----------  Vendor Imports  ----------*/
import React, { PureComponent } from 'react';
import styled from 'styled-components';

/*----------  Custom imports  ----------*/
import FloatingInput from '@/components/FloatingInput';

/*====================================
=            RegisterForm            =
====================================*/

class RegisterForm extends PureComponent {
  render() {
    return (
      <RegisterFormContainer>
        <SpacedFloatingInput
          textLabel='Full Name'
          errorMessage=''
        />
        <SpacedFloatingInput
          textLabel='Email'
          errorMessage=''
        />
        <SpacedFloatingInput
          textLabel='Password'
          errorMessage=''
        />
        <RegisterButton>
          Create Your Free Account
        </RegisterButton>
      </RegisterFormContainer>
    );
  }
}

export default RegisterForm;

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
`;
