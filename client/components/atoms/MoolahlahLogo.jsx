/*----------  Vendor Imports  ----------*/
import styled from 'styled-components';

/**
 * Moolahlah Logo
 * The bread & butter of the brand.
 */
const MoolahlahLogo = styled.span`
  background: url(/assets/image/moolahlah_logo.png) no-repeat;
  background-size: ${({ width }) => `${width}rem ${(+width/3.37)}rem`};
  width: ${({ width }) => `${width}rem`};
  height: ${({ width }) => `${+width/3.37}rem`};
  margin: ${({ margin }) => margin};
  display: block;
`;

MoolahlahLogo.defaultProps = {
  width: '30',
  margin: '0 0 2rem 0',
};

export default MoolahlahLogo;
