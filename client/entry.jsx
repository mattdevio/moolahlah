/*----------  Vendor Imports  ----------*/
import { render } from 'react-dom';

/*----------  Custom Imports  ----------*/
import App from '@/App';
import withAllProviders from '@/hocs/withAllProviders';

render(
  withAllProviders(App),
  document.getElementById('root'),
);
