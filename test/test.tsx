import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Header from '../app/components/Header';

describe('<Header />', () => {
  it('renders three <header /> elements', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(<header/>)).to.have.lengthOf(1);
  });
});