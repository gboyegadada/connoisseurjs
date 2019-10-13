import React from 'react';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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