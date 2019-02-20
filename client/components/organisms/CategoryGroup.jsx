/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/*----------  Custom imports  ----------*/
import CategoryGroupHeader from '@/components/molecules/CategoryGroupHeader';
import LineItem from '@/components/molecules/LineItem';

/*=====================================
=            CategoryGroup            =
=====================================*/

class CategoryGroup extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { accessId, categoryLabel, canEdit, isDebit, lineItems } = this.props;
    return (
      <CategoryGroupContainer>
        <CategoryGroupHeader
          categoryLabel={ categoryLabel }
          canEdit={ canEdit }
          accessId={ accessId }
        />
      </CategoryGroupContainer>
    );
  }
}

CategoryGroup.propTypes = {
  accessId: PropTypes.string.isRequired,
  categoryLabel: PropTypes.string.isRequired,
  canEdit: PropTypes.number.isRequired,
  isDebit: PropTypes.number.isRequired,
  lineItems: PropTypes.object.isRequired,
};

export default CategoryGroup;

/*=====  End of CategoryGroup  ======*/


const CategoryGroupContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  min-width: 55rem;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
  padding: 1rem;
`;