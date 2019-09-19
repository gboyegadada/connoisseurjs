import axios from 'axios'
import { SearchQuery } from '../types/search'

// To avoid exposing our KEY on the client side, we'll use 
// a proxy endpoint.
const BASE_URL = `/rest/search/v2`

export const search = (query: SearchQuery) => {
    return axios.post(BASE_URL, {
        q: query.query,
        aq: query.advancedQuery
    }, 
    {
        headers: {
            "Content-Type": 'application/json',
            Accept: 'application/json'
        }
    })
    .then(res => res.data)
}