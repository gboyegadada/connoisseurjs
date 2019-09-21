import {createReducerFunction} from "immer-reducer"
import {
    Action,
    applyMiddleware,
    bindActionCreators,
    compose,
    createStore,
    Reducer,
} from "redux"
import {makeConnector} from "redux-render-prop"
import createSagaMiddleware from "redux-saga"

import {FacetActions, FacetReducer, SearchLifecycleReducer, SearchReducer, SearchActions, MenuActions, MenuReducer, PaginatorActions, PaginatorReducer} from "./actions"
import {rootSaga} from "./sagas"
import {initialState, Selectors} from "./state"
import {State} from '../types/state' 

export const createSearchConnect = makeConnector({
    prepareState: (state: State) => new Selectors(state),
    prepareActions: dispatch => bindActionCreators(SearchActions, dispatch),
})

export const createFacetConnect = makeConnector({
    prepareState: (state: State) => new Selectors(state),
    prepareActions: dispatch => bindActionCreators(FacetActions, dispatch),
})

export const createMenuConnect = makeConnector({
    prepareState: (state: State) => state.menuOpen,
    prepareActions: dispatch => bindActionCreators(MenuActions, dispatch),
})

export const createPaginatorConnect = makeConnector({
    prepareState: (state: State) => new Selectors(state),
    prepareActions: dispatch => bindActionCreators(PaginatorActions, dispatch),
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function
    }
}

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose

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

export function makeStore() {
    const reducer = composeReducers<State>(
        createReducerFunction(FacetReducer, initialState),
        createReducerFunction(MenuReducer, initialState),
        createReducerFunction(PaginatorReducer, initialState),
        createReducerFunction(SearchReducer, initialState),
        createReducerFunction(SearchLifecycleReducer, initialState),
    )
    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(
        reducer,
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    )

    sagaMiddleware.run(rootSaga)

    return store
}