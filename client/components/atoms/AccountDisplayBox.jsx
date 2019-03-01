import styled from 'styled-components';

const AccountDisplayBox = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.9);
  font-size: 3rem;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typeFont};
  font-weight: 700;
  color: ${({ theme }) => theme.darkBlue};
`;

export default AccountDisplayBox;
