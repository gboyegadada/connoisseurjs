import {rootReducer} from '../redux/reducers'

// Import mock data for [#updateSearchResults] reducer action
import payload__updateSearchResults from './__mock__/payloads/updateSearchResults.json'
import state__updateSearchResults from './__mock__/states/updateSearchResults.json'

describe("Search Actions", () => {
  test('Update Search Query Action', () => {
    // Dispatch
    const state = rootReducer(
          {
            q:'',
            aq:'',
            status:1,
            queryId:0,
            language:'en',
            firstResult:0,
            numberOfResults:12,
            sortCriteria:'fielddescending',
            sortField:'@tpmillesime',
            menuOpen:false,
            totalCount:0,
            totalCountFiltered:0,
            facets:{},
            reloadSearch: false,
            response:null
          }, 
    
          {
            type:'IMMER_REDUCER:SearchReducer#updateSearchQuery',
            payload: {
                q:'vin rouge',
                aq:''
            }
          }
      )

    // Assert
    expect(state).toEqual(
        {
            q:'vin rouge',
            aq:'',
            status:1,
            queryId:0,
            language:'en',
            firstResult:0,
            numberOfResults:12,
            sortCriteria:'fielddescending',
            sortField:'@tpmillesime',
            menuOpen:false,
            totalCount:0,
            totalCountFiltered:0,
            facets:{},
            reloadSearch: false,
            response:null
          }
      )
  })

  test('Start Search Action', () => {
    // Dispatch
    const state = rootReducer(
          {
            q:'vin rouge',
            aq:'',
            status:1,
            queryId:0,
            language:'en',
            firstResult:0,
            numberOfResults:12,
            sortCriteria:'fielddescending',
            sortField:'@tpmillesime',
            menuOpen:false,
            totalCount:0,
            totalCountFiltered:0,
            facets:{},
            reloadSearch: false,
            response:null
          }, 
    
          {
            type:'IMMER_REDUCER:SearchReducer#startSearch'
          }
      )

    // Assert
    expect(state).toEqual(
        {
            q:'vin rouge',
            aq:'',
            status:0,
            queryId:1,
            language:'en',
            firstResult:0,
            numberOfResults:12,
            sortCriteria:'fielddescending',
            sortField:'@tpmillesime',
            menuOpen:false,
            totalCount:0,
            totalCountFiltered:0,
            facets:{},
            reloadSearch: false,
            response:null
          }
      )
  })

  test('Update Search Results', () => {
    // Dispatch
    const state = rootReducer({
      "q": "vin rouge",
      "aq": "",
      "status": 0,
      "queryId": 1,
      "language": "en",
      "firstResult": 0,
      "numberOfResults": 12,
      "sortCriteria": "fielddescending",
      "sortField": "@tpmillesime",
      "menuOpen": false,
      "totalCount": 0,
      "totalCountFiltered": 0,
      "facets": {},
      "response": null
    }, payload__updateSearchResults)

    // Assert new state
    expect(state).toEqual(state__updateSearchResults)
    
  })

})
