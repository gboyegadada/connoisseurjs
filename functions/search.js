const express = require('express')
const cors = require('cors')
const serverless = require('serverless-http')
const axios = require('axios')
const path = require('path')
const bp = require('body-parser') // for parsing JSON in request bodies
const dotenv = require('dotenv')

// loading .env file
dotenv.config()

const KEY = process.env.API_KEY
const BASE_URL = `https://cloudplatform.coveo.com/rest/search/v2`

const app = express()
app.use(cors())

// parse JSON in the body of requests
app.use(bp.json());

function handleError(error, _res) {
    var res = {};
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        res = error.response
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        res = {
            message: 'Request error'
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        res = {
            message: error.message
        }
      }
      console.log(error.config);

      _res
      .status(500)
      .send(res)
}

const router = express.Router()
router.get('/', (req, res) => {
    res.send({
        msg: 'WYD ?? 👀'
    })
})

router.post('/', (req, res) => {
    const { q, aq } = req.body // Make sure we are getting nothing other than q and aq

    axios.post(BASE_URL, {q, aq},
    { 
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            Authorization: `Bearer ${KEY}`
        }
    })
    .then(response => response.data)
    .then(data => {
        res.send(data)
    })
    .catch(error => handleError(error, res))
})

app.use('/.netlify/functions/search', router);  // path must route to ------> /.netlify/functions/{function-name}

module.exports = app;
module.exports.handler = serverless(app)