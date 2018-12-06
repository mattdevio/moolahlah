// Vendor Imports
import React from 'react';
import { mount } from 'enzyme';

// Custom Imports
import MoolahlahLogo from '@/components/MoolahlahLogo';

describe('<MoolahlahLogo /> Component', () => {

  it('Should match the snapshot', () => {
    const snap = mount(<MoolahlahLogo />);
    expect(snap).toMatchSnapshot();
  });

});