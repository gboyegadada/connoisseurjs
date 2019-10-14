import React from 'react';
import { shallow } from 'enzyme'

import FacetValue from "../components/FacetValue";


describe("<FacetValue />", () => {
  test("should display clickable Facet Value", async () => {
    const main = shallow(<FacetValue 
            key='tpdisponibilite'
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
        />)

    expect(main).toMatchSnapshot()
  });
});