import React from 'react';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Facet from "../components/Facet";


describe("<Facet />", () => {
  test("should display clickable Facet with 1 facet value", async () => {
    const field = 'tpdisponibilite'
    const main = shallow(<Facet 
            key={field}
            data-field={field}
            data={{ 
                field,
                title: 'Disponibilité', 
                values: [{ 
                  value: 'En Succursale', 
                  lookupValue: 'En Succursale', 
                  score: 1, 
                  valueType: 'Standard', 
                  numberOfResults: 1, 
                  checked: false, 
                  exclude: false 
              }]
            }}
        />)

    expect(main).toMatchSnapshot()
  });
});