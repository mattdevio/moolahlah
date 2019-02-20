// Vendor Imports
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Custom Imports
import ToggleInput from '@/components/atoms/ToggleInput';
import { updateCategoryGroupLabel } from '@/state/ducks/budget';


class CategoryGroupHeader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { categoryLabel, canEdit, dispatchUpdateCategoryGroupLabel, accessId } = this.props;
    return (
      <CategoryGroupHeaderContainer>
        <ToggleInput
          value={ categoryLabel }
          placeholder='Category Label'
          onValueChange={ categoryLabel => dispatchUpdateCategoryGroupLabel({ accessId, categoryLabel }) }
          canEdit={ true }
        />
        <HeadHelper margin='0 1rem'>Date</HeadHelper>
        <HeadHelper>Planned</HeadHelper>
      </CategoryGroupHeaderContainer>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  dispatchUpdateCategoryGroupLabel: ({ accessId, categoryLabel }) => dispatch(updateCategoryGroupLabel({
    accessId,
    categoryLabel,
  })),
});

CategoryGroupHeader.propTypes = {
  categoryLabel: PropTypes.string.isRequired,
  canEdit: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(CategoryGroupHeader);

const CategoryGroupHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  width: 100%;
  padding: 1rem;
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


