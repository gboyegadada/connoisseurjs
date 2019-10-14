import React from 'react';
import { shallow } from 'enzyme'

import CardList from "../components/CardList";


describe("<CardList />", () => {
  test("should display card grid", async () => {
    const main = shallow(<CardList 
            list={[
              { 
                "title": "Marc Tempé Gewurztraminer Mambourg grand cru 2009",
                "uri": "https://www.saq.com/page/fr/saqcom/vin-blanc/marc-tempe-gewurztraminer-mambourg-grand-cru-2009/12184732",
                "uniqueId": "-1$0$30292.23337$https://www.saq.com/page/fr/saqcom/vin-blanc/marc-tempe-gewurztraminer-mambourg-grand-cru-2009/12184732",
                "raw": {
                  "tpregion": "Alsace",
                  "tppays": "France",
                  "tpthumbnailuri": "http://s7d9.scene7.com/is/image/SAQ/12184732_is",
                  "tpprixnum": 62.25,
                }
              }
          ]}
        />)

    expect(main).toMatchSnapshot()
  });
});