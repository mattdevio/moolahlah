/*----------  Vendor Imports  ----------*/
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

/*----------  Custom Imports  ----------*/
import store from '@/state/store';
import { moolahlahTheme } from '@/App/styled_theme';


/**
 * withAllProviders - HOC that mounts all context api providers
 * @param  {React Node} Component [The main application component]
 * @return {React Node}
 */
const withAllProviders = Component => (
  <Router>
    <ReduxProvider store={ store }>
      <ThemeProvider theme={ moolahlahTheme } >
        <Component />
      </ThemeProvider>
    </ReduxProvider>
  </Router>
);

export default withAllProviders;
