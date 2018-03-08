// load what we need

var express = require('express');

var port = process.env.PORT;
var host = process.env.IP;

// start the server

var app = express();

// set middleware

app.get('/', function(req, res) {
    
    res.send( { ipaddress: req.headers['x-forwarded-for'],
                language: req.headers["accept-language"].match(/[^;,]*/)[0],
                software: req.headers['user-agent'].match(/\((.*?)\)/)[1]
            });

});

// launch server

app.listen(port, host);