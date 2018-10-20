/*----------  Vendor Imports  ----------*/
import styled from 'styled-components';

/**
 * Moolahlah Logo
 * The bread & butter of the brand.
 */
// const MoolahlahLogo = styled.span`
//   background: url(/assets/image/moolahlah_logo.png) no-repeat;
//   background-size: 30rem 8.9rem;
//   width: 30rem;
//   height: 8.9rem;
//   margin-bottom: 2rem;
//   display: inline-block;
// `;

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
