import {put, takeLatest, all, takeEvery, select} from "redux-saga/effects"

import {SearchActions, FacetActions, PaginatorActions, SortActions} from "./actions"
import { search } from "../utils/api"
import { Selectors } from "./state"
import qs from 'qs'
import { stat } from "fs"

/**
 * This is called whenever the [startSearch] redux action is dispatched.
 * 
 * @param action
 */
function* monitorStartSearch(action: ReturnType<typeof SearchActions.startSearch>) {
    const state = yield select()
    const queryParams = (new Selectors(state)).getQueryParams()

    console.log("INFO", "Start search with query:", queryParams)

    try {
        const result = yield search(queryParams)

        console.log("INFO", "Search completed", result)

        yield all([
            put(SearchActions.updateSearchResults(result)),
            put(FacetActions.hydrateFacets(result.groupByResults)),
            put(SearchActions.buildQueryFromURL())
        ]) 
    } catch (e) {
        // Catch error thrown by our search helper func.
        yield put(SearchActions.error({
            message: e
        }))
    }
}
/**
 * This is called whenever the [buildQueryFromURL] redux action is dispatched.
 * 
 * @param action
 */
function* monitorBuildQueryFromURL() {
    const state = yield select()

    if (state.reloadSearch) {
        console.log("INFO", 'Will reload search results...')

        yield put(SearchActions.startSearch())
    }
}

/**
 * This is called whenever the [gotoPage] redux action is dispatched.
 * 
 * @param action
 */
function* monitorPageChange(action: ReturnType<typeof PaginatorActions.gotoPage>) {
    const state = yield select()
    const queryParams = (new Selectors(state)).getQueryParams()

    console.log("INFO", `Page changing to ${action.payload.page}`, action.payload)

    const firstResult = action.payload.page * queryParams.numberOfResults
    yield put(SearchActions.startSearch())
}

/**
 * This is called whenever the [sort] redux action is dispatched.
 * 
 * @param action
 */
function* monitorSortAction(action: ReturnType<typeof SortActions.sort>) {
    const state = yield select()

    yield put(SearchActions.startSearch())
}

/**
 * This is called whenever the [sort] redux action is dispatched.
 * 
 * @param action
 */
function* monitorFacetAction(action: ReturnType<any>) {
    // Build advanced query
    yield put(SearchActions.buildAdvancedQuery())
    
    // Let's trigger search
    const state = yield select()
    yield put(SearchActions.startSearch())

    const { q, sortCriteria: order, sortField: sort } = (new Selectors(state)).getQueryParams()

    action.payload.history.push(`/?${qs.stringify({q, order, sort, ...qs.parse(state.aqUrlEncoded)})}`)
}

export function* rootSaga() {
    yield all([
        // Handle search...
        takeEvery(SearchActions.startSearch.type, monitorStartSearch),

        // Reload search results if query string is not empty...
        takeLatest(SearchActions.buildQueryFromURL.type, monitorBuildQueryFromURL),

        // Handle changes in facet values
        takeLatest(FacetActions.tickFacetValue.type, monitorFacetAction),
        takeLatest(FacetActions.untickFacetValue.type, monitorFacetAction),
        takeLatest(FacetActions.includeFacetValue.type, monitorFacetAction),
        takeLatest(FacetActions.excludeFacetValue.type, monitorFacetAction),

        // Handle pagination
        takeEvery(PaginatorActions.gotoPage.type, monitorPageChange),

        // Handle sort
        takeEvery(SortActions.sort.type, monitorSortAction)
    ])

}