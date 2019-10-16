import React from 'react';
import { shallow } from 'enzyme'

import Sort from "../components/Sort";


describe("<Sort />", () => {
  test("should display sort component", async () => {
    const main = shallow(<Sort />)

    expect(main).toMatchSnapshot()
  });
});