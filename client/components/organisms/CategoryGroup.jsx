/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

/*----------  Custom imports  ----------*/
import CategoryGroupHeader from '@/components/molecules/CategoryGroupHeader';
import LineItem from '@/components/molecules/LineItem';

/*=====================================
=            CategoryGroup            =
=====================================*/

class CategoryGroup extends Component {
  render() {
    return (
      <CategoryGroupContainer>
        <CategoryGroupHeader />
        <LineItem
          labelValue='What up!'
          dayPickerValue={ '20180814' }
          plannedValue={ '0.00' }
        />
      </CategoryGroupContainer>
    );
  }
}

// CategoryGroup.propTypes = {

// };

export default CategoryGroup;

/*=====  End of CategoryGroup  ======*/


const CategoryGroupContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  min-width: 55rem;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
  padding: 1rem;
`;