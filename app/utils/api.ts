import axios from 'axios'
import { SearchQuery } from '../types/search'
import { RawFacet } from '../types/facet'
import qs from 'qs'

let BASE_URL: string

// To avoid exposing our KEY on the client side, we'll use 
// a proxy endpoint.
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') {
    // dev code
    BASE_URL = `http://localhost:9000/.netlify/functions/search`
} else {
    BASE_URL = `https://connoisseurjs.netlify.com/.netlify/functions/search`
}

/**
 * There's currently no way to fetch this list 
 * via the API (perhaps because it's a Sandbox) so 
 * we'll put in an array for now.
 */
const fields = [
    "@tpenspecial",
    "@tpdisponibilite",
    "@tpcategorie",
    "@tppays",
    "@tpregion",
    "@tpmillesime",
    "@tpcoteexpertsplitgroup",
    "@tpcepagenomsplitgroup",
    "@tpinventairenomsuccursalesplitgroup",
    "@tpclassification",
    "@tppastilledegout",
    "@tpfamilledevinsplitgroup",
    "@tpaccordsnommenu",
    "@tpparticularitesplitgroup",
    "@tpobservationsgustativesacidite",
    "@tpobservationsgustativescorps",
    "@tpobservationsgustativessucre",
    "@tpobservationsgustativestannins",
    "@tpobservationsgustativestexture",
    "@tpprixnum"
]

/**
 * Tranform field list (👆🏽) to group-by query.
 */
const prepGroupByQuery = () => {
    return fields.map(field => {
        return field === '@tpprixnum' 
        ? {
            field: field,
            completeFacetWithStandardValues: true,
            generateAutomaticRanges: true,
            maximumNumberOfValues: 1,
            sortCriteria: "nosort"
        }
        
        : {
            field: field,
            maximumNumberOfValues: 6,
            sortCriteria: "occurrences",
            injectionDepth: 1000,
            completeFacetWithStandardValues: true
        }
    })
}

/**
 * Helper fn to make API calls to search endpoint.
 * 
 * @param query 
 */
export const search = async (query: SearchQuery) => {
    try {
        const res = await axios.post(BASE_URL, qs.stringify({
            ...{ groupBy: JSON.stringify(prepGroupByQuery()) },
            ...query
        }), 
        {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Accept": 'application/json'
            }
        })
        
        return res.data
    } catch(error) { 
        return handleError(error)
    }
}

/**
 * Throws an exception that we can catch later. Also logs useful data.
 * 
 * @param error
 */
function handleError(error: any) {
    let res: any;

    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)

        res = {
            message: `Server Error ${error.response.status}`,
            data: error.response.data,
            headers: error.response.headers
        }
        res = error.response
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
        res = {
            message: 'Request error'
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
        res = {
            message: error.message
        }
      }
      console.log(error.config)

      throw `Request error ----- ${res.message} ------`
}