import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

import Header from '../app/components/Header';

describe('<Header />', () => {
  it('renders three <header /> elements', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header')).to.have.length(1);
  });
});