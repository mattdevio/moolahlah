/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/*----------  Custom imports  ----------*/
import CategoryGroupHeader from '@/components/molecules/CategoryGroupHeader';
import LineItem from '@/components/molecules/LineItem';
import { requestNewLineItem } from '@/state/ducks/budget';

/*=====================================
=            CategoryGroup            =
=====================================*/

class CategoryGroup extends Component {

  constructor(props) {
    super(props);
    this.requestNewLineitem = this.requestNewLineitem.bind(this);
  }

  requestNewLineitem() {
    const { dispatchRequestNewLineitem, accessId } = this.props;
    dispatchRequestNewLineitem(accessId);
  }

  render() {
    const { accessId, categoryLabel, canEdit, isDebit, lineItems } = this.props;
    return (
      <CategoryGroupContainer>
        <CategoryGroupHeader
          categoryLabel={ categoryLabel }
          canEdit={ canEdit }
          accessId={ accessId }
          isDebit={ isDebit }
        />
        {Object.keys(lineItems).map(key => {
          const li = lineItems[key];
          if (!li) return; // don't remove this line
          return (
            <LineItem
              key={ key }
              accessId={ key}
              labelValue={ li.label }
              dayPickerValue={ li.estimateDate }
              plannedValue={ li.estimate }
              parent={ accessId }
              isDebit={ isDebit }
              isBeingDeleted={ li.isBeingDeleted }
            />
          );
        })}
        <AddLineItem onClick={ this.requestNewLineitem }>Add Line Item</AddLineItem>
      </CategoryGroupContainer>
    );
  }
}

CategoryGroup.propTypes = {
  accessId: PropTypes.string.isRequired,
  categoryLabel: PropTypes.string.isRequired,
  canEdit: PropTypes.bool.isRequired,
  isDebit: PropTypes.bool.isRequired,
  lineItems: PropTypes.object.isRequired,
  dispatchRequestNewLineitem: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchRequestNewLineitem: accessId => dispatch(requestNewLineItem({ accessId })),
});

export default connect(null, mapDispatchToProps)(CategoryGroup);

/*=====  End of CategoryGroup  ======*/


const CategoryGroupContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  min-width: 55rem;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.9);
  padding: 1rem;
`;

const AddLineItem = styled.button`
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