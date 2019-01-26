// Vendor Imports
import styled from 'styled-components';


const LineInput = styled.input.attrs({ type: 'text' })`
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont};
  color: ${({theme}) => theme.black};
  border: 0.1rem solid ${({ theme }) => theme.black};
  font-weight: 700;
  width: 100%;
  max-width: ${({ maxWidth }) => !!maxWidth && maxWidth };
  min-Width: ${({ minWidth }) => !!minWidth && minWidth };
  padding: 0.3rem 0;
  margin: 0;
  border: 0;
  text-align: ${({ alignRight }) => alignRight ? 'right' : 'left' };
  border-bottom: 0.3rem solid ${({ theme }) => theme.black };
  &:focus {
    outline: 0;
  }
`;

export default LineInput;
