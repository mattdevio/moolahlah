/*----------  Vendor Imports  ----------*/
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*----------  Custom Imports  ----------*/


const AuthInputBox = ({ iconName, placeHolder, inputType, value, onChange }) => (
  <AuthInputBoxContainer>
    <FormInput
      placeholder={ placeHolder }
      type={ inputType }
      value={ value }
      onChange={ e => onChange(e.target.value) }
    />
    <AuthInputStyledIcon icon={ iconName } />
  </AuthInputBoxContainer>
);

AuthInputBox.propTypes = {
  iconName: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AuthInputBox;


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