import {createActionCreators, ImmerReducer} from "immer-reducer";

import {Selectors} from "./state";
import {State} from '../types/state'
import { FacetValue, RawFacet, RawFacetValue } from "../types/facet";
import { SearchQuery, SearchStatus, SearchResponse, SearchError } from "../types/search";


/**
 * Actions for handling facets and filters
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
 * Actions that handle the search query and results
 */
export class SearchReducer extends ImmerReducer<State> {
    selectors = new Selectors(this.draftState);

    /**
     * Initiate a search query and set the current status to: [searching]
     * 
     * @param SearchQuery payload 
     */
    startSearch(payload: SearchQuery) {
        this.draftState.status = SearchStatus.searching
        this.draftState.query = payload.query
        this.draftState.advancedQuery = payload.advancedQuery
        this.draftState.response = null
    }

    /**
     * Handle response from Coveo search endpoint
     * 
     * @param SearchResponse payload 
     */
    updateSearchResults(payload: SearchResponse) {
        this.draftState.status = SearchStatus.complete

        this.draftState.response = payload
    }

    /**
     * Handle response from Coveo search endpoint
     * 
     * @param SearchResponse payload 
     */
    error(payload: SearchError) {
        this.draftState.status = SearchStatus.error
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

/**
 * Actions for opening and collapsing side menu in small screens
 */
export class MenuReducer extends ImmerReducer<State> {
    openMenu() {
        this.draftState.menuOpen = true
    }

    closeMenu() {
        this.draftState.menuOpen = false
    }

    toggleMenu() {
        this.draftState.menuOpen = !this.draftState.menuOpen
    }
}

export const FacetActions = createActionCreators(FacetReducer);
export const MenuActions = createActionCreators(MenuReducer);
export const SearchActions = createActionCreators(SearchReducer);
export const SearchLifecycleActions = createActionCreators(SearchLifecycleReducer);