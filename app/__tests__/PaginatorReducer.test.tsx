import {rootReducer} from '../redux/reducers'

// Import mock data for [#gotoPage] reducer action
import state__gotoPage from './__mock__/states/gotoPage.json'

describe("Paginator Actions", () => {
  test('Goto Page Action', () => {
    // Dispatch
    const state = rootReducer(
      state__gotoPage.initial,     
      {
        "type": "IMMER_REDUCER:PaginatorReducer#gotoPage",
        "payload": {
          "page": 1
        }
      }
    )

    // Assert
    expect(state).toEqual(state__gotoPage.new)

  })

})
