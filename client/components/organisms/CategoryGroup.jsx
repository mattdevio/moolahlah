/*----------  Vendor Imports  ----------*/
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/*----------  Custom imports  ----------*/
import CategoryGroupHeader from '@/components/molecules/CategoryGroupHeader';
import CustomDayPicker from '@/components/atoms/CustomDayPicker';

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
      <LineItemContainer onClick={this.handleEditClick}>
        {
          this.state.isEditing ?
            <Fragment>
              <LineItemLabelDisplay>
                Label Name
              </LineItemLabelDisplay>
              <CustomDayPicker />
              <DisplayField>
                {'$933.25'}
              </DisplayField>
            </Fragment> :
            <Fragment>
              <LineItemLabelDisplay>
                Label Name
              </LineItemLabelDisplay>
              <DisplayField>
                {'01.18.2018'}
              </DisplayField>
              <DisplayField>
                {'$933.25'}
              </DisplayField>
            </Fragment>
        }
      </LineItemContainer>
    );
  }

}

const LineItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.3rem 0;
  cursor: pointer;
  > *:nth-child(2) {
    margin-left: auto;
  }
  &:hover {
    background-color: ${({theme}) => theme.skyBlue};
  }
`;

const LineItemLabelDisplay = styled.p`
  margin: 0;
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont};
  color: ${({theme}) => theme.black};
  font-weight: 700;
`;

const DisplayField = styled.p`
  margin: 0;
  font-size: 2.5rem;
  font-family: ${({theme}) => theme.typeFont};
  color: ${({theme}) => theme.black};
  font-weight: 700;
  width: 100%;
  max-width: 25rem;
  text-align: right;
`;
