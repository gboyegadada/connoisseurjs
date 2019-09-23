
import {createReducerFunction} from "immer-reducer"
import { Reducer } from "redux"

import {FacetReducer, SearchLifecycleReducer, SearchReducer, MenuReducer, PaginatorReducer, SortReducer} from "./actions"
import {initialState} from "./state"
import {State} from '../types/state' 

/**
 * Combine multiple reducers into a single one
 *
 * @param reducers two or more reducer
 */
function composeReducers<S>(
    ...reducers: (Reducer<S, any>)[]
): Reducer<any, any> {
    return (firstState: any, action: any) =>
        reducers.reduce((state, subReducer) => {
            if (typeof subReducer === "function") {
                return subReducer(state, action)
            }

            return state
        }, firstState) || firstState
}


export const rootReducer = composeReducers<State>(
    createReducerFunction(FacetReducer, initialState),
    createReducerFunction(MenuReducer, initialState),
    createReducerFunction(PaginatorReducer, initialState),
    createReducerFunction(SortReducer, initialState),
    createReducerFunction(SearchReducer, initialState),
    createReducerFunction(SearchLifecycleReducer, initialState),
)