import React from 'react';
import { shallow } from 'enzyme'

import SortLink from "../components/SortLink";


describe("<SortLink />", () => {
  test("should display clickable sort links", async () => {
    const main = shallow(<SortLink 
          label='Millesime' 
          field='@tpmillesime' 
          criteria='ascending'
          activeField='@tpmillesime'
          activeCriteria='fieldascending'
          queryParams={{
              q: '',
              aq: '',
          }}
          sortAction={(): any => null}
        />)

    expect(main).toMatchSnapshot()
  });
});