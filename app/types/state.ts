import { Facet } from './facet'
import { SearchStatus, SearchResponse } from './search';

export interface State {
    query: string
    advancedQuery: string
    status: SearchStatus
    menuOpen: boolean
    totalCount: number
    totalCountFiltered: number
    duration: number // ms
    indexDuration: number // ms
    requestDuration: number // ms
    facets: {[id: string]: Facet}
    response: SearchResponse|null
}