import React from 'react';
import { mount } from 'enzyme'

jest.mock('react-router-dom');

import { SearchBox } from "../components/SearchBox";
import { createBrowserHistory } from 'history';

describe("<SearchBox />", () => {
  const history = createBrowserHistory()

  const wrapper = mount(<SearchBox
    history={history}
    location={history.location}
    match={{
      params: {},
      isExact: false,
      path: '',
      url: '',
    }}
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
    />
  )

  it('Matches snapshot', async () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('renders search text <input />', async () => {
    expect(wrapper.find('input').length).toEqual(1);
  })

  it('renders cancel <button />', async () => {
    expect(wrapper.find('button').length).toEqual(1);
  })

  it('renders search <Link /> button', async () => {
    expect(wrapper.find('Link').length).toEqual(1);
  })

})