import { FacetList, Field } from './facet'
import { SearchStatus, SearchResponse } from './search';

export interface State {
    q: string
    aq: string
    queryId: number
    firstResult: number
    language: string
    numberOfResults: number
    sortCriteria: string
    sortField: string
    status: SearchStatus
    menuOpen: boolean
    totalCount: number
    totalCountFiltered: number
    facets: FacetList
    fields: Field[]
    response: SearchResponse|null
}