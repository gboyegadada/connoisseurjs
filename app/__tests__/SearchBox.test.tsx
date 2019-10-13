import React from 'react';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import SearchBox from "../components/SearchBox";


describe("<SearchBox />", () => {
  test("should display search box", async () => {
    const main = shallow(<SearchBox 
        searchAction={(): any => null } 
        updateSearchQueryAction={(): any => null } 
        defaultQuery={{
          q: 'Vin Rouge',
          aq: '',
        }} 
        queryParams={{
          q: 'Vin Rouge',
          aq: '',
        }} 
        status={1}
        />)

    expect(main).toMatchSnapshot()
  });
});