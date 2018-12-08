// Vendor Imports
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';

/**
 * Setup Tests
 * Configure Enzyme to work with React and Styled Components
 */
configure({
  adapter: new Adapter(),
});