/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/*----------  Custom imports  ----------*/
import StaticInput from '@/components/atoms/StaticInput';


/*=====================================
=            CategoryGroup            =
=====================================*/

class CategoryGroup extends Component {
  render() {
    return (
      <CategoryGroupContainer baseColor={ this.props.baseColor }>
        <HeadingGroupContainer>
          <HeadingTitle>{ this.props.category }</HeadingTitle>
          <HeadingButtonGroup>
            <ButtonIcon icon='minus-circle' />
            <ButtonIcon icon='plus-circle' />
          </HeadingButtonGroup>
        </HeadingGroupContainer>
        <InputGroupContainer>
          <StaticInput
            type='text'
            value=''
            onChange={ value => console.log(value) }
            textLabel='Income Label'
          />
          <StaticInput
            type='text'
            value=''
            onChange={ value => console.log(value) }
            textLabel='Expected Date'
          />
          <StaticInput
            type='text'
            value=''
            onChange={ value => console.log(value) }
            textLabel='Expected Value'
          />
        </InputGroupContainer>
        <InputGroupContainer>
          <StaticInput
            type='text'
            value=''
            onChange={ value => console.log(value) }
            textLabel='Income Label'
          />
          <StaticInput
            type='text'
            value=''
            onChange={ value => console.log(value) }
            textLabel='Expected Date'
          />
          <StaticInput
            type='text'
            value=''
            onChange={ value => console.log(value) }
            textLabel='Expected Value'
          />
        </InputGroupContainer>
        <InputGroupContainer>
          <StaticInput
            type='text'
            value=''
            onChange={ value => console.log(value) }
            textLabel='Income Label'
          />
          <StaticInput
            type='text'
            value=''
            onChange={ value => console.log(value) }
            textLabel='Expected Date'
          />
          <StaticInput
            type='text'
            value=''
            onChange={ value => console.log(value) }
            textLabel='Expected Value'
          />
        </InputGroupContainer>
      </CategoryGroupContainer>
    );
  }
}

CategoryGroup.propTypes = {
  category: PropTypes.string.isRequired,
  budgetRecords: PropTypes.arrayOf(PropTypes.shape({
    accessId: PropTypes.string,
    label: PropTypes.string,
    estimateDate: PropTypes.string,
    estimate: PropTypes.number,
  })).isRequired, 
  baseColor: PropTypes.string.isRequired,
};

export default CategoryGroup;

/*=====  End of CategoryGroup  ======*/


const CategoryGroupContainer = styled.div`
  padding: 1rem;
  background-color: ${({ theme, baseColor }) => theme[baseColor]};
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
  margin-bottom: 2rem;
`;

const HeadingGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const HeadingTitle = styled.p`
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  margin: 0;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
  font-family: ${({ theme }) => theme.typeFont};
`;

const HeadingButtonGroup = styled.div`
  margin-left: auto;
  width: 8rem;
  display: flex;
  flex-direction:row;
  justify-content: space-between;
`;

const ButtonIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  display: inline-block;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.skyBlue};
  }
`;

const InputGroupContainer = styled.div`
  width: 100%;
  min-height: 1rem;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  div:nth-child(2) {
    margin: 0 1rem;
  }
`;
