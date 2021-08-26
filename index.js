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
    let options = {
        url: req.url.slice(1),
        method: req.method,
        headers: req.headers,
        httpsAgent: new https.Agent({rejectUnauthorized: false}),
    };
    if (Object.keys(body).length > 0) {
        options.data = body;
    }
    console.log(req.url.slice(1));
    console.log(req.headers);
    console.log(body);

    axios(options).then(function (response) {
        res.json(response.data);
        res.send();
    }).catch(function (reason) {
        console.log(reason.response.data)
    }).finally(function () {
        console.log('-----------------------\n');
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});