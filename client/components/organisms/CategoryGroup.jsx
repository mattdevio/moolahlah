/*----------  Vendor Imports  ----------*/
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';

/*----------  Custom imports  ----------*/
import CategoryGroupHeader from '@/components/molecules/CategoryGroupHeader';
import LineDayPicker from '@/components/atoms/LineDayPicker';

/*=====================================
=            CategoryGroup            =
=====================================*/

class CategoryGroup extends Component {
  render() {
    return (
      <CategoryGroupContainer>
        <CategoryGroupHeader />
        <LineItem />
      </CategoryGroupContainer>
    );
  }
}

CategoryGroup.propTypes = {

};

export default CategoryGroup;

/*=====  End of CategoryGroup  ======*/


const CategoryGroupContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
  padding: 1rem;
`;


class LineItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick() {
    this.setState({
      isEditing: true,
    });
  }

  render() {
    return (
      <LineItemContainer>
        {
          this.state.isEditing ?
            <LineItemFlexContainer>
              <LineDayPicker />
            </LineItemFlexContainer> :
            <ClickableLineItemFlexContainer onClick={this.handleEditClick}>
              <LabelDisplayField>
                Line Item Test
              </LabelDisplayField>
              <AttributeDisplayField>
                {moment(new Date()).format('MM/DD/YYYY')}
              </AttributeDisplayField>
              <AttributeDisplayField>
                $235.00
              </AttributeDisplayField>
            </ClickableLineItemFlexContainer>
        }
      </LineItemContainer>
    );
  }

}

const LineItemContainer = styled.div`
  width: 100%;
`;

const LineItemFlexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ClickableLineItemFlexContainer = styled(LineItemFlexContainer)`
  &:hover {
    background-color: ${({theme}) => theme.skyBlue};
  }
  cursor: pointer;
`;

const LabelDisplayField = styled.p`
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont};
  color: ${({theme}) => theme.black};
  font-weight: 700;
  width: 100%;
  margin: 0;
  padding: 0.3rem 0;
`;

const AttributeDisplayField = styled.p`
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont};
  color: ${({theme}) => theme.black};
  font-weight: 700;
  margin: 0;
  text-align: right;
  width: 100%;
  max-width: 25rem;
  padding: 0.3rem 0;
`;
