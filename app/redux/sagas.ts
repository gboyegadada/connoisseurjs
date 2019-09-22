import {put, takeLatest, all, takeEvery, select} from "redux-saga/effects"

import {SearchActions, FacetActions, PaginatorActions, SortActions} from "./actions"
import { search } from "../utils/api"
import { Selectors } from "./state"

/**
 * This is called whenever the [startSearch] redux action is dispatched.
 * 
 * @param action
 */
function* monitorStartSearch(action: ReturnType<typeof SearchActions.startSearch>) {

    console.log("INFO", "Start search with query:", action.payload)

    try {
        const result = yield search(action.payload)

        console.log("INFO", "Search completed", result)

        yield all([
            put(SearchActions.updateSearchResults(result)),
            put(FacetActions.hydrateFacets(result.groupByResults))
        ]) 
    } catch (e) {
        // Catch error thrown by our search helper func.
        yield put(SearchActions.error({
            message: e
        }))
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
    yield put(SearchActions.startSearch({firstResult, ...queryParams}))
}

/**
 * This is called whenever the [sort] redux action is dispatched.
 * 
 * @param action
 */
function* monitorSortAction(action: ReturnType<typeof SortActions.sort>) {
    const state = yield select()
    const queryParams = (new Selectors(state)).getQueryParams()

    const { criteria, field = '' } = action.payload

    const sortParams = {
        sortCriteria: field === '' ? criteria : `field${field.replace('@', '')}`,
        sortField: field 
    }

    yield put(SearchActions.startSearch({...sortParams, ...queryParams}))
}

export function* rootSaga() {
    yield all([
        takeLatest(SearchActions.startSearch.type, monitorStartSearch),
        takeEvery(PaginatorActions.gotoPage.type, monitorPageChange),
        takeEvery(SortActions.sort.type, monitorSortAction)
    ])

}