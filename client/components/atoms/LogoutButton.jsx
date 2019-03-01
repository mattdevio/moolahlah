// Vendor Imports
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const LogOutButton = () => (
  <LBContainer>
    Sign Out <LogoutIcon />
  </LBContainer>
);

export default LogOutButton;


const LBContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 2rem);
  font-size: 3rem;
  background-color: ${({ theme }) => theme.mediumBlue};
  color: ${({ theme }) => theme.white};
  padding: 0.3rem;
  font-family: ${({ theme }) => theme.typeFont};
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.white};
  margin: 1rem;
  &:hover,
  &:focus {
    outline: 0;
  }
  > svg {
    transition: all 0.2s;
  }
  &:hover > svg {
    margin-left: 1.5rem;
    color: ${({ theme }) => theme.skyBlue};
  }
`;

const LogoutIcon = styled(FontAwesomeIcon).attrs({ icon: 'sign-out-alt'  })`
  font-size: 2rem;
  display: inline-block;
  margin: 0 0 0 1rem;
  color: ${({ theme }) => theme.white};
`;