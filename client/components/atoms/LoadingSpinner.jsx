// Vendor Imports
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoadingSpinner = styled(FontAwesomeIcon).attrs({ icon: 'spinner', spin: true  })`
  font-size: 10rem;
  width: 10rem;
  display: block;
  margin: 10rem auto;
  color: ${({ theme }) => theme.mediumBlue};
`;
export default LoadingSpinner;