import {createActionCreators, ImmerReducer} from "immer-reducer";

import {Selectors} from "./state";
import {State} from '../types/state'
import { FacetValue, RawFacet, RawFacetValue } from "../types/facet";
import { SearchQuery, SearchStatus, SearchResponse, SearchError } from "../types/search";
import qs from 'qs'
import { kMaxLength } from "buffer";

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
        const facets = this.selectors.getFacetList()
        //if (Object.keys(facets).length > 0) return;

        payload.forEach((facetPayload: RawFacet) => {
            this.addFacet(facetPayload)
        })
    }

    tickFacetValue(payload: {field: string, value: string, history?: any}) {
        const index = this.selectors.getFacetValueIndex(payload.field, payload.value);

        this.draftState.facets[payload.field].values[index].checked = true
    }

    untickFacetValue(payload: {field: string, value: string, history?: any}) {
        const index = this.selectors.getFacetValueIndex(payload.field, payload.value);

        this.draftState.facets[payload.field].values[index].checked = false
        this.draftState.facets[payload.field].values[index].exclude = false
    }

    includeFacetValue(payload: {field: string, value: string, history?: any}) {
        const index = this.selectors.getFacetValueIndex(payload.field, payload.value);

        this.draftState.facets[payload.field].values[index].exclude = false
        this.draftState.facets[payload.field].values[index].checked = false
    }

    excludeFacetValue(payload: {field: string, value: string, history?: any}) {
        const index = this.selectors.getFacetValueIndex(payload.field, payload.value);

        this.draftState.facets[payload.field].values[index].exclude = true
        this.draftState.facets[payload.field].values[index].checked = true
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
    updateSearchQuery(payload: SearchQuery) {
        this.draftState.q = payload.q
    }

    /**
     * Initiate a search query and set the current status to: [searching]
     * 
     * @param SearchQuery payload 
     */
    startSearch() {
        this.draftState.status = SearchStatus.searching
        this.draftState.queryId += 1
        this.draftState.reloadSearch = false
    }

    /**
     * Handle response from Coveo search endpoint
     * 
     * @param SearchResponse payload 
     */
    updateSearchResults(payload: SearchResponse) {
        const {q = '', sort = '', order = '', ...qp} = qs.parse(location.search.substring(1))
        
        let aq = ''
        for (const k in qp) {
            if (/^f:/.test(k)) {
                aq = k 
                break
            }
        }

        if (
                (q !== '' && this.draftState.q === '') || 
                (sort !== '' && this.draftState.sortField === '') || 
                (order !== '' && this.draftState.sortCriteria === '') || 
                (aq !== '' && this.draftState.aqUrlEncoded === '')
            ) return

        this.draftState.status = SearchStatus.complete

        this.draftState.response = payload
        this.draftState.totalCount = payload.totalCount
        this.draftState.totalCountFiltered = payload.totalCountFiltered
    }

    buildQueryFromURL() {
        const {q = '', ...qp} = qs.parse(location.search.substring(1))

        if ('' !== q) {
            this.draftState.q = q
        }

        for (const k in qp) {
            if (!/^f:/.test(k)) continue

            const [, field, exclude = null] = k.split(':')
            const values: string[] = qp[k]

            try {
                values.map(v => {
                        const index = this.selectors.getFacetValueIndex(field, v)

                        this.draftState.facets[field].values[index].checked = true
                        this.draftState.facets[field].values[index].exclude = exclude ? true : false
                })
            } catch (e) {
                // Continue
                console.log('Not found:', field)
                break;
            }
        }

        if (Object.keys(this.draftState.facets).length > 0) this.buildAdvancedQuery()
    }

    /**
     * This will help us build advanced queries using selected facet values
     */
    buildAdvancedQuery() {
        const facets = this.draftState.facets
        const initial_advance_query_string = this.draftState.aqUrlEncoded

        let fragments: string[] = [];
        let urlParams: {
            [id: string]: string[]
        } = {};

        for (const k in facets) {
            let fieldFragments: string[] = []
            let includes: string[] = []
            let excludes: string[] = []

            facets[k].values
            .filter(v => v.checked || v.exclude)
            .forEach(v => {

                // Checked
                if (v.checked && !v.exclude) includes.push(v.lookupValue)

                // Excluded
                if (v.exclude) excludes.push(v.lookupValue)
            })

            if (includes.length > 0) { 
                fieldFragments.push(`(@${facets[k].field}==${this.squash(includes)})`)

                urlParams[`f:${facets[k].field}`] = includes
            }

            if (excludes.length > 0) {
                fieldFragments.push(`(NOT @${facets[k].field}==${this.squash(excludes)})`)
                urlParams[`f:${facets[k].field}:not`] = excludes
            }

            if (fieldFragments.length > 0) fragments.push(`(${fieldFragments.join(' ')})`)
        }

        this.draftState.aq = fragments.join(' ')
        this.draftState.aqUrlEncoded = qs.stringify(urlParams)

        if (initial_advance_query_string !== this.draftState.aqUrlEncoded) {
            // Try again when facets are loaded...
            this.draftState.reloadSearch = true
        }
    }

    private squash(arr: string[]) {
        if (arr.length === 0) return ''

        return arr.length > 1 ? `("${arr.join('","')}")` : `"${arr[0]}"`
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