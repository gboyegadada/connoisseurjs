const express = require('express')
const fetch = require('node-fetch')
const path = require('path')
const bp = require('body-parser'); // for parsing JSON in request bodies
const dotenv = require('dotenv');

// loading .env file
dotenv.config();

const KEY = process.env.API_KEY
const PORT = process.env.APP_PORT
const BASE_URL = `https://cloudplatform.coveo.com/rest/search/v2`

const app = express();
app.use(express.static(path.join(__dirname, 'dist')))

// parse JSON in the body of requests
app.use(bp.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.post('/search', (req, res) => {
    fetch(BASE_URL,
    { 
        method: 'post', 
        body: JSON.stringify(req.body),
        headers: {
            "Content-Type": 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${KEY}`
        }
    })
    .then(response => response.text())
    .then(data => {
        res.send(data)
    })
})

app.listen(PORT)