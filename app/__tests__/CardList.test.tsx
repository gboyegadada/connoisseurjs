import React from 'react';
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'

import CardList from "../components/CardList";
import { Provider } from 'react-redux';

import state__updateSearchResults from './__mock__/states/updateSearchResults.json'

jest.mock('react-router-dom');

describe("<CardList />", () => {
  const initialState = state__updateSearchResults
  const mockStore = configureStore()
  let store: any 
  let wrapper: any

  beforeEach(()=>{
      store = mockStore(initialState)
      wrapper = mount(<Provider store={store}><CardList 
              list={state__updateSearchResults.response.results}
          /></Provider>)
  })

  test("should display card grid", async () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('PaginationBoxView').length).toEqual(1)
  })
})