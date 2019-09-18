import {createActionCreators, ImmerReducer} from "immer-reducer";

import {Selectors} from "./state";
import {State} from '../types/state'
import { FacetValue, RawFacet, RawFacetValue } from "../types/facet";
import { SearchQuery, SearchStatus, SearchResponse } from "../types/search";


/**
 * Actions that actually modify the todo content
 */
export class FacetReducer extends ImmerReducer<State> {
    selectors = new Selectors(this.draftState);

    private mapFacetValue = (v: RawFacetValue): FacetValue => ({
        value: v.value,
        lookupValue: v.lookupValue,
        numberOfResults: v.numberOfResults,
        score: v.score,
        valueType: v.valueType,
        checked: false,
        exclude: false
    })

    addFacet(payload: RawFacet) {
        this.draftState.facets[payload.field] = {
            field: payload.field,
            values: payload.values.map(this.mapFacetValue)
        };
    }

    addFacets(payload: RawFacet[]) {
        payload.map((facetPayload: RawFacet) => {
            this.addFacet(facetPayload)
        })
    }

    tickFacetValue(payload: {id: string}) {
        // const index = this.selectors.getFacetValueIndex(payload.field, payload.value);

        // this.draftState.facets[payload.field].values[index].checked = true
    }

    untickFacetValue(payload: {field: string, value: string}) {
        const index = this.selectors.getFacetValueIndex(payload.field, payload.value);

        this.draftState.facets[payload.field].values[index].checked = false
    }
}

/**
 * Actions that actually modify the todo content
 */
export class SearchReducer extends ImmerReducer<State> {
    selectors = new Selectors(this.draftState);

    startSearch(payload: SearchQuery) {
        this.draftState.status = SearchStatus.searching
        this.draftState.query = payload.query
        this.draftState.advancedQuery = payload.advancedQuery
    }

    updateSearchResults(payload: SearchResponse) {
        this.draftState.status = SearchStatus.complete

        debugger
        this.draftState.response = payload
    }
}

/**
 * Actions for search lifecycle management
 */
export class SearchLifecycleReducer extends ImmerReducer<State> {
    selectors = new Selectors(this.draftState);

    setSearchStatus(payload: {status: SearchStatus}) {
        // @TODO: Handle lifecyle event
    }
}

export const FacetActions = createActionCreators(FacetReducer);
export const SearchActions = createActionCreators(SearchReducer);
export const SearchLifecycleActions = createActionCreators(SearchLifecycleReducer);