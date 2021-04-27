const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const querystring = require('querystring');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const PORT = 3000;
const HOST = '172.17.0.1';

app.use('/', function (req, res) {
    let body = req.body;
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        body = querystring.stringify(body);
    }
    console.log(body);
    console.log('\n');
    let options = {
        url: req.url.slice(1),
        method: req.method,
        headers: req.headers,
        data: body,
        httpsAgent: new https.Agent({rejectUnauthorized: false}),
    };

    axios(options).then(function (response) {
        res.json(response.data);
        res.send();
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});