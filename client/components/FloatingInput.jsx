/*----------  Vendor Imports  ----------*/
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';

/*----------  Custom imports  ----------*/

/*=============================================
=            FloatingInput Component            =
=============================================*/

class FloatingInput extends PureComponent {
  render() {
    const {
      value,
      onChange,
      textLabel,
      errorMessage,
      className,
      type,
    } = this.props;
    return (
      <FloatingInputContainer className={ className }>
        <TextInputBox value={ value } onChange={ e => onChange(e.target.value) } type={ type } />
        <InputHighlight />
        <TextLabel>{ textLabel }</TextLabel>
        {
          !!errorMessage && <ErrorMessage>Error: { errorMessage }</ErrorMessage>
        }
      </FloatingInputContainer>
    );
  }
}

FloatingInput.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
  textLabel: string.isRequired,
  errorMessage: string.isRequired,
  className: string,
  type: string.isRequired,
};

export default FloatingInput;

/*=====  End of FloatingInput Component  ======*/

const FloatingInputContainer = styled.div`
  padding: 2rem 0;
  width: 100%;
  position: relative;
`;

const TextInputBox = styled.input.attrs({
  required: true,
})`
  border: none;
  background: transparent;
  display: block;
  width: 100%;
  font-family: ${({ theme }) => theme.typeFont};
  font-size: 2.6rem;
  font-weight: 400;
  border-bottom: 3px solid ${({ theme }) => theme.darkBlue};
  &:focus {
    outline: none;
  }
  &:focus ~ label,
  &:valid ~ label {
    top: 0;
    left: 0.2rem;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.darkBlue};
  }
  &:focus ~ span {
    max-width: 100%;
  }
`;

const TextLabel = styled.label`
  font-size: 2.6rem;
  position: absolute;
  top: 2rem;
  left: 0;
  font-size: 2.6rem;
  font-family: ${({ theme }) => theme.typeFont};
  color: ${({ theme }) => theme.darkBlue};
  pointer-events: none;
  transition:0.2s ease all;
`;

const InputHighlight = styled.span`
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
  height: 0.3rem;
  transition:0.2s ease all;
  max-width: 0;
  background: ${({ theme }) => theme.skyBlue};
`;


const ErrorMessage = styled.p`
  font-size: 1.5rem;
  position: absolute;
  bottom: 0;
  left: 0.2rem;
  margin: 0;
  color: ${({ theme }) => theme.alertRed};
  font-family: ${({ theme }) => theme.typeFont};
  font-weight: 700;
  letter-spacing: 0.1rem;
`;
