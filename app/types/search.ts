export interface SearchQuery {
    query: string
    advancedQuery: string 
}

export enum SearchStatus {
    searching = 0,
    complete = 1,
    error = -1
}

export interface SearchResponse {
    totalCount: number
    totalCountFiltered: number
    duration: number
    indexDuration: number
    requestDuration: number
    results: []
    groupByResults: []
}
