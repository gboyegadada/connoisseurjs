import {createActionCreators, ImmerReducer} from "immer-reducer";

import {Selectors} from "./state";
import {State} from '../types/state'
import { FacetValue, RawFacet, RawFacetValue, Field } from "../types/facet";
import { SearchQuery, SearchStatus, SearchResponse, SearchError } from "../types/search";

const facetLabels: {[id: string]: string} = {
    "tpenspecial": "En spécial",
    "tpdisponibilite": "Disponibilité",
    "tpcategorie": "Catégorie",
    "tppays": "Pays",
    "tpregion": "Region",
    "tpmillesime": "Millésime",
    "tpcoteexpertsplitgroup": "Cote d\u0027expert",
    "tpcepagenomsplitgroup": "Cépage",
    "tpinventairenomsuccursalesplitgroup": "Succursale",
    "tpclassification": "Classification",
    "tppastilledegout": "Pastille de goût",
    "tpfamilledevinsplitgroup": "Famille de vin",
    "tpaccordsnommenu": "Accords suggérés",
    "tpparticularitesplitgroup": "Particularité",
    "tpobservationsgustativesacidite": "Acidité (Gustative)",
    "tpobservationsgustativescorps": "Corps (Gustatif)",
    "tpobservationsgustativessucre": "Sucre (Gustatif)",
    "tpobservationsgustativestannins": "Tannins (Gustatif)",
    "tpobservationsgustativestexture": "Texture (Gustative)"
  }

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
            title: facetLabels.hasOwnProperty(payload.field) ? facetLabels[payload.field] : '',
            values: payload.values.map(this.mapFacetValue)
        };
    }

    hydrateFacets(payload: RawFacet[]) {
        this.draftState.facets = {}

        payload.map((facetPayload: RawFacet) => {
            this.addFacet(facetPayload)
        })
    }

    tickFacetValue(payload: {field: string, value: string}) {
        const index = this.selectors.getFacetValueIndex(payload.field, payload.value);

        this.draftState.facets[payload.field].values[index].checked = true
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
        this.draftState.q = payload.q
        this.draftState.aq = payload.aq
        this.draftState.queryId += 1
    }

    /**
     * Handle response from Coveo search endpoint
     * 
     * @param SearchResponse payload 
     */
    updateSearchResults(payload: SearchResponse) {
        this.draftState.status = SearchStatus.complete

        this.draftState.response = payload
        this.draftState.totalCount = payload.totalCount
        this.draftState.totalCountFiltered = payload.totalCountFiltered
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

export class PaginatorReducer extends ImmerReducer<State> {
    selectors = new Selectors(this.draftState);

    /**
     * Update offset to one page forward (12 items forward) in state. 
     * We will listen for this action in a saga. 
     */
    next() {
        this.draftState.firstResult += this.draftState.numberOfResults
    }

    /**
     * Update offset by one page back (12 items back) in state. 
     * We will listen for this action in a saga. 
     */
    previous() {
        if (this.draftState.firstResult <= 0) return

        this.draftState.firstResult += this.draftState.numberOfResults
    }

    gotoPage(payload: {page: number}) {
        let offset = payload.page * this.draftState.numberOfResults

        if (offset < this.draftState.totalCount) {
            this.draftState.firstResult = offset
        } else {
            this.draftState.firstResult = 0
        }
    }
}

export class SortReducer extends ImmerReducer<State> {
    selectors = new Selectors(this.draftState);

    sort(payload: {criteria: string, field?: string}) {
        const { criteria, field = '' } = payload

        this.draftState.sortCriteria = criteria
        this.draftState.sortField = field 
    }

    sortField(payload: {field: string}) {
        this.draftState.sortField = payload.field
    }

    sortCriteria(payload: {value: string}) {
        this.draftState.sortCriteria = payload.value
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
export const PaginatorActions = createActionCreators(PaginatorReducer);
export const SortActions = createActionCreators(SortReducer);
export const SearchActions = createActionCreators(SearchReducer);
export const SearchLifecycleActions = createActionCreators(SearchLifecycleReducer);