/*----------  Vendor Imports  ----------*/
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*----------  Custom Imports  ----------*/


const AuthInputBox = ({ iconName, placeHolder, inputType, value, onChange, error }) => (
  <MainContainer>
    { !!error &&
      <ErrorMessageBubble>
        { error }
      </ErrorMessageBubble> 
    }
    <AuthInputBoxContainer>
      <FormInput
        placeholder={ placeHolder }
        type={ inputType }
        value={ value }
        onChange={ e => onChange(e.target.value) }
      />
      <AuthInputStyledIcon icon={ iconName } />
    </AuthInputBoxContainer>
  </MainContainer>
);

AuthInputBox.propTypes = {
  iconName: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default AuthInputBox;


const MainContainer = styled.div`
  width: 100%;
`;

const AuthInputBoxContainer = styled.div`
  width: 100%;
  position: relative;
  display: block;
`;

const FormInput = styled.input`
  padding: 0;
  letter-spacing: 0.1rem;
  color: ${({theme}) => theme.mediumBlue};
  font-family: ${({theme}) => theme.typeFont};
  font-size: 2.3rem;
  font-weight: 700;
  padding: 0.4rem 1.3rem 0.4rem 5rem;
  border-radius: 2.5rem;
  border: 2px solid ${({ theme }) => theme.skyBlue};
  width: 100%;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.mediumBlue};
  }
  &::placeholder {
    color: ${({ theme }) => theme.skyBlue};
  }
`;

const AuthInputStyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.mediumBlue};
  width: 2.5rem !important;
  height: 2.5rem !important;
  position: absolute;
  top: 50%;
  left: 1.8rem;
  transform: translateY(-50%);
`;

const ErrorMessageBubble = styled.span`
  font-family: ${({ theme }) => theme.typeFont};
  color: ${({ theme }) => theme.white};
  font-weight: 700;
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  padding: 0.7rem 0.3rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.alertColor};
  width: 100%;
  display: block;
  text-align: center;
  position: relative;
  &:after {
    content: ' ';
    width: 0; 
    height: 0; 
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    border-top: 1rem solid ${({ theme }) => theme.alertColor};
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -1rem;
    z-index: 100;
  }
`;