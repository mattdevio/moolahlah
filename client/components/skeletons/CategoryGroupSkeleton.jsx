// Vendor Imports
import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';


const CagetoryGroupSkeleton = props => (
  <CategoryGroupContentLoader {...props}>
    <rect x="0" y="0" width="1080" height="180" />
  </CategoryGroupContentLoader>
);

export default CagetoryGroupSkeleton;

const CategoryGroupContentLoader = styled(ContentLoader).attrs({
  speed: 2,
  width: 1080,
  height: 150,
  preserveAspectRatio: 'none',
})`
  width: 100%;
  height: 180px;
  margin-bottom: 5rem;
`;