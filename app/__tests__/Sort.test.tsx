import React from 'react';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Sort from "../components/Sort";


describe("<Sort />", () => {
  test("should display sort component", async () => {
    const main = shallow(<Sort />)

    expect(main).toMatchSnapshot()
  });
});