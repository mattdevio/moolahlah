/*----------  Vendor Imports  ----------*/
import React from 'react';
import { render } from 'react-dom';

const App = () => (
  <div>
    <h1>React is working</h1>
    <img src='/assets/image/maincow.png' alt='' />

  </div>
);

render(
  <App />,
  document.getElementById('root'),
);
