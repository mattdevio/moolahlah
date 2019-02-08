// Vendor Imports
import React from 'react';
import styled from 'styled-components';

/**
 * LineInput
 * A styled input used for the Budget Line Item
 */
const LineInput = ({ maxWidth, minWidth, forwardRef, ...props }) => (
  <LineInputContainer maxWidth={maxWidth} minWidth={minWidth} >
    { console.dir(props) }
    <LineInputBox {...props} ref={forwardRef} />
    <Hightlight />
  </LineInputContainer>
);

export default LineInput;


const LineInputContainer = styled.div`
  max-width: ${({ maxWidth }) => !!maxWidth && maxWidth };
  min-Width: ${({ minWidth }) => !!minWidth && minWidth };
  width: 100%;
  position: relative;
`;

const LineInputBox = styled.input.attrs({ type: 'text' })`
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont};
  color: ${({theme}) => theme.black};
  border: 0.1rem solid ${({ theme }) => theme.black};
  font-weight: 700;
  width: 100%;
  padding: 0.3rem 0;
  margin: 0;
  border: 0;
  text-align: ${({ alignRight }) => alignRight ? 'right' : 'left' };
  border-bottom: 0.4rem solid ${({ theme }) => theme.black };
  &:focus {
    outline: 0;
  }
  &:focus ~ span {
    max-width: 100%;
  }
`;

const Hightlight = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.4rem;
  transition:0.2s ease all;
  max-width: 0;
  background: ${({ theme }) => theme.skyBlue};
`;
