import {put, takeLatest, all, takeEvery} from "redux-saga/effects"

import {SearchActions, FacetActions, PaginatorActions} from "./actions"
import { search } from "../utils/api"

function* monitorStartSearch(action: ReturnType<typeof SearchActions.startSearch>) {

    console.log("Start search with query:", action.payload.q, action.payload.aq)

    try {
        const result = yield search(action.payload)

        console.log("Search completed for", action.payload.q)

        yield all([
            put(SearchActions.updateSearchResults(result)),
            put(FacetActions.hydrateFacets(result.groupByResults))
        ]) 
    } catch (e) {
        yield put(SearchActions.error({
            message: e
        }))
    }
}

function* monitorPageChange(action: ReturnType<typeof PaginatorActions.gotoPage>) {

    console.log("Page changing to:", action.payload.page)

    debugger
    action.payload.query.firstResult = action.payload.page * action.payload.query.numberOfResults
    yield put(SearchActions.startSearch(action.payload.query))
}

export function* rootSaga() {
    yield all([
        takeLatest(SearchActions.startSearch.type, monitorStartSearch),
        takeEvery(PaginatorActions.gotoPage.type, monitorPageChange)
    ])

}