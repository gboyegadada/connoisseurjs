import React from 'react';
import { mount } from 'enzyme'

import { SortLink } from "../components/SortLink";

jest.mock('react-router-dom');

describe("<SortLink />", () => {
  test("should display clickable sort links", async () => {
    const wrapper = mount(<SortLink
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

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('Link').length).toEqual(1)
  })
});