// Vendor Imports
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const AddCategoryButton = ({ dispatchAddCategory }) => (
  <AddCategoryButtonContainer>
    <ACB onClick={ dispatchAddCategory }>
      Add Category Group
    </ACB>
  </AddCategoryButtonContainer>
);

AddCategoryButton.propTypes = {
  dispatchAddCategory: PropTypes.func.isRequired,
};

export default connect(null, dispatch => ({
  dispatchAddCategory: () => dispatch(),
}))(AddCategoryButton);

const AddCategoryButtonContainer = styled.div`
  width: 100%;
  margin: 0 0 2rem 0;
  min-width: 55rem;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.9);
  padding: 1rem;
`;

const ACB = styled.button`
  display: block;
  width: 100%;
  background-color: ${({ theme }) => theme.mediumBlue};
  color: ${({ theme }) => theme.white};
  font-family: ${({ theme }) => theme.typeFont};
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  margin: 0.5rem 0 0 0;
  padding: 0.3rem;
  cursor: pointer;
  border: 2px solid transparent;
  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.skyBlue};
    outline: 0;
  }
`;
