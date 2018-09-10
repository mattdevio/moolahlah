/*----------  Vendor Imports  ----------*/
import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

const Logo = styled.h1`
  font-family: 'Covered By Your Grace';
  font-size: 50px;
  display: block;
  margin: 0 auto;
  max-width: 900px;
`;
const SubLogo = styled.p`
  font-family: 'Catamaran';
  font-size: 30px;
  display:block;
  margin: 0 auto;
  max-width: 900px;
`;

const App = () => (
  <div>
    <Logo>moolahlah</Logo>
    <SubLogo>This is the subfont catamaran</SubLogo>
    <img src='/assets/image/maincow.png' alt='' />
  </div>
);

render(
  <App />,
  document.getElementById('root'),
);
