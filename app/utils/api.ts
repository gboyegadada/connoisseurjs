import axios from 'axios'
import { SearchQuery } from '../types/search'

const KEY = process.env.API_KEY
const BASE_URL = `https://cloudplatform.coveo.com/rest/search/v2`

export const search = (query: SearchQuery) => {
    return axios.post(BASE_URL, {
        q: query.query,
        aq: query.advancedQuery
    }, 
    {
        headers: {
            "Content-Type": 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${KEY}`
        }
    })
    .then(res => res.data)
}