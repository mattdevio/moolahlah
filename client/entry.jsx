/*----------  Vendor Imports  ----------*/
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

/*----------  Custom Imports  ----------*/
import App from '@/App';
import store from '@/state/store';

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root'),
);
