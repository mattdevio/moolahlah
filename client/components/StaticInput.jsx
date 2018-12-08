/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/*----------  Custom imports  ----------*/


/*=============================================
=            StaticInput Component            =
=============================================*/

class StaticInput extends Component {
  render() {
    const {
      value,
      onChange,
      textLabel,
      className,
      type,
    } = this.props;
    return (
      <StaticInputGroupContainer className={ className }>
        <InputBox
          placeholder={ textLabel }
          value={ value }
          onChange={ e => onChange(e.target.value) }
          type={ type }
        />
        <Highlight />
      </StaticInputGroupContainer>
    );
  }
}

StaticInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  textLabel: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default StaticInput;

/*=====  End of StaticInput Component  ======*/


const StaticInputGroupContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputBox = styled.input`
  padding: 0.5rem;
  font-size: 2rem;
  font-family: ${({ theme }) => theme.typeFont};
  background: transparent;
  border: none;
  border-bottom: 0.4rem solid ${({ theme }) => theme.white};
  width: 100%;
  color: ${({ theme }) => theme.white};
  &:focus {
    outline: none;
  }
  &:focus ~ span {
    max-width: 100%;
  }
  &::placeholder {
    color: ${({ theme }) => theme.white};
  }
`;

const Highlight = styled.span`
  margin: 0;
  padding: 0;
  height: 0.4rem;
  display: block;
  width: 100%;
  background-color: ${({ theme }) => theme.skyBlue};
  position: absolute;
  bottom: 0;
  left: 0;
  max-width: 0;
  transition:0.2s ease all;
`;
