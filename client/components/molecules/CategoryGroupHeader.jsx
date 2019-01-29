// Vendor Imports
import React from 'react';
import styled from 'styled-components';

// Custom Imports
import ToggleInput from '@/components/atoms/ToggleInput';


const CategoryGroupHeader = () => (
  <CategoryGroupHeaderContainer>
    <ToggleInput />
    <HeadHelper margin='0 1rem'>Date</HeadHelper>
    <HeadHelper>Planned</HeadHelper>
  </CategoryGroupHeaderContainer>
);

export default CategoryGroupHeader;

const CategoryGroupHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  width: 100%;
  padding: 1rem;
  margin-bottom: 0.5rem;
  > *:nth-child(2) {
    margin-left: auto;
  }
`;

const HeadHelper = styled.p`
  padding: 0;
  margin: ${({ margin }) => margin ? margin : 0 };
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont};
  color: #777;
  font-weight: 700;
  width: 100%;
  max-width: 25rem;
  text-align: right;
`;


