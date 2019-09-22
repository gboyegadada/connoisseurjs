import { State } from '../types/state'
import { FacetValue, FacetItem, FacetList } from '../types/facet'
import { SearchStatus, ResultItem } from '../types/search'

export const initialState: State = {
    q: '',
    aq: '',
    status: SearchStatus.complete,
    queryId: 0,
    language: 'en',
    firstResult: 0,
    numberOfResults: 12,
    sortCriteria: 'fielddescending',
    sortField: '@tpmillesime',
    menuOpen: false,
    totalCount: 0,
    totalCountFiltered: 0,
    facets: {},
    response: null
}

/**
 * Some state selection helpers. Using helper like makes it easier to refactor
 * the the state structure when required. This selector helper can be used in
 * both the render prop connect and the Immer Reducer.
 */
export class Selectors {
    state: State

    constructor(state: State) {
        this.state = state
    }

    getQueryParams() {
        const {
            aq,
            language,
            firstResult,
            numberOfResults,
            sortCriteria,
            sortField
        } = this.state

        return {
            aq,
            language,
            firstResult,
            numberOfResults,
            sortCriteria,
            sortField
        }
    }

    getSearchQuery() {
        return this.state.q
    }

    getAdvancedQuery() {
        return this.state.aq
    }

    getQueryId() {
        return this.state.queryId
    }

    getStatus() {
        return this.state.status
    }

    getOffset() {
        return this.state.firstResult
    }

    getPageLength() {
        return this.state.numberOfResults
    }

    getPageCount() {
        const { totalCountFiltered, numberOfResults } = this.state

        return Math.ceil(totalCountFiltered / numberOfResults)
    }

    getTotalCount(): number {
        return this.state.response 
            ? this.state.response.totalCount 
            : 0
    }

    getItemCount(): number {
        return this.state.response 
            ? this.state.response.results.length 
            : 0
    }

    getSearchResults(): ResultItem[] {
        return this.state.response 
            ? this.state.response.results 
            : []
    }

    getFacetList(): FacetList {
        return this.state.facets
    }

    getFacet(id: string) {
        const facet = this.state.facets[id]
        if (!facet) {
            throw new Error("Cannot find Facet with id: " + id)
        }
        return facet
    }

    getFacetValue(field: string, value: string): [number, FacetValue] {
        const facet = this.state.facets[field]
        if (!facet) {
            throw new Error("Cannot find Facet with field name: " + field)
        }
        const index: number = facet.values.findIndex((v: FacetValue) => v.value === value)

        return [
            index, 
            facet.values[index]
        ]
    }

    getFacetValueIndex(field: string, value: string): number {
        const facet = this.state.facets[field]
        if (!facet) {
            throw new Error("Cannot find Facet with field name: " + field)
        }
        
        const index = facet.values.findIndex((v: FacetValue) => v.value === value)
        if (index === -1) {
            throw new Error(`Cannot find value [${value}] in ${field} field`)
        }

        return index
    }
}