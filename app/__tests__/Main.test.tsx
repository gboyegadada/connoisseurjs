import React from 'react';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Main from "../components/Main";


describe("<Main />", () => {
  test("should display a header, sidebar and main body", async () => {
    const main = shallow(<Main />)

    expect(main).toMatchSnapshot()
  });
});