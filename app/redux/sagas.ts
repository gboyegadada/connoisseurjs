import {put, takeLatest} from "redux-saga/effects";

import {SearchActions} from "./actions";
import { search } from "../utils/api";

function* monitorStartSearch(action: ReturnType<typeof SearchActions.startSearch>) {

    console.log("Start search with query:", action.payload.query, action.payload.advancedQuery);

    const result = yield search(action.payload)

    console.log("Search completed for", action.payload.query);
    yield put(SearchActions.updateSearchResults(result));
}

export function* rootSaga() {
    yield takeLatest(SearchActions.startSearch.type, monitorStartSearch);
}