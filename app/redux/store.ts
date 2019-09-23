import {
    applyMiddleware,
    bindActionCreators,
    compose,
    createStore,
} from "redux"
import {makeConnector} from "redux-render-prop"
import createSagaMiddleware from "redux-saga"

import {FacetActions, SearchActions, MenuActions, PaginatorActions, SortActions} from "./actions"
import {rootSaga} from "./sagas"
import {Selectors} from "./state"
import {State} from '../types/state' 
import {rootReducer} from '../redux/reducers'

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

export const createSortConnect = makeConnector({
    prepareState: (state: State) => new Selectors(state),
    prepareActions: dispatch => bindActionCreators(SortActions, dispatch),
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

export function makeStore() {
    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    )

    sagaMiddleware.run(rootSaga)

    return store
}