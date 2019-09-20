const express = require('express')
const cors = require('cors')
const path = require('path')
const bp = require('body-parser'); // for parsing JSON in request bodies
const dotenv = require('dotenv');

// loading .env file
dotenv.config();

const PORT = process.env.APP_PORT

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')))

// parse JSON in the body of requests
app.use(bp.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'), {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
})

app.listen(PORT)