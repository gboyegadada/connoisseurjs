import React from 'react';
import { shallow } from 'enzyme'

import Main from "../components/Main";


describe("<Main />", () => {
  test("should display a header, sidebar and main body", async () => {
    const main = shallow(<Main />)

    expect(main).toMatchSnapshot()
  });
});