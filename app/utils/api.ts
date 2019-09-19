import axios from 'axios'
import { SearchQuery } from '../types/search'

// To avoid exposing our KEY on the client side, we'll use 
// a proxy endpoint.
const BASE_URL = `https://jovial-golick-376158.netlify.com/.netlify/functions/search`

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