export interface SearchQuery {
    q: string
    aq: string 
    firstResult: number
    numberOfResults: number
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

export interface SearchError {
    message: string
}

export interface ResultItem {
    uniqueId: string
    title: string
    uri: string
    raw: {
        tpthumbnailuri: string
        tppays: string
        tpregion: string
        tpprixnum: string
    }
}