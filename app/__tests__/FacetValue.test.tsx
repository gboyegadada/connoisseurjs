import React from 'react';
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'

import { FacetValue } from "../components/FacetValue";
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

jest.mock('react-router-dom');

describe("<FacetValue />", () => {

  const history = createBrowserHistory()
  const initialState = {output:100}
  const mockStore = configureStore()
  let store: any 
  let wrapper: any

  beforeEach(()=>{
      store = mockStore(initialState)
      wrapper = mount(<Provider store={store}><FacetValue 
        history={history}
        location={history.location}
        match={{
          params: {},
          isExact: false,
          path: '',
          url: '',
        }}
        fkey='tpdisponibilite'
        field='tpdisponibilite'
        data={{ 
            value: 'En Succursale', 
            lookupValue: 'En Succursale', 
            score: 1, 
            valueType: 'Standard', 
            numberOfResults: 1, 
            checked: false, 
            exclude: false 
        }}
    /></Provider>) 
  })

  test("should display clickable Facet Value", async () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('MdCheckBoxOutlineBlank').length).toEqual(1)
  });
});