import { State } from '../types/state'
import { FacetValue } from '../types/facet'
import { SearchStatus, ResultItem } from '../types/search'
import { number } from 'prop-types'

export const initialState: State = {
    query: '',
    advancedQuery: '',
    status: SearchStatus.complete,
    queryId: 0,
    menuOpen: false,
    totalCount: 0,
    totalCountFiltered: 0,
    duration: 0,
    indexDuration: 0,
    requestDuration: 0,
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

    getSearchQuery() {
        return this.state.query
    }

    getAdvancedQuery() {
        return this.state.advancedQuery
    }

    getQueryId() {
        return this.state.queryId
    }

    getStatus() {
        return this.state.status
    }

    getSearchResults(): ResultItem[] {
        return this.state.response 
            ? this.state.response.results 
            : []
    }

    getFacetIDs() {
        return Object.values(this.state.facets)
            .map(facet => facet.field)
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