// Vendor Imports
import styled from 'styled-components';

/**
 * TabContentContainer
 * The container the wraps the aside tab section
 */
const TabContentContainer = styled.div`
  width: 40rem;
  height: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${({ theme, bgColor }) => theme[bgColor]};
  overflow-y: scroll;
`;

export default TabContentContainer;

