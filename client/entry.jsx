/*----------  Vendor Imports  ----------*/
import { render } from 'react-dom';

/*----------  Custom Imports  ----------*/
import App from '@/components/pages/App';
import withAllProviders from '@/bin/hocs/withAllProviders';

render(
  withAllProviders(App),
  document.getElementById('root'),
);
