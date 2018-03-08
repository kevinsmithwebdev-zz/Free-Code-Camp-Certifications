// load what we need
var express = require('express');
var port = process.env.PORT;
var host = process.env.IP;

// start the server

var app = express();

//*********

function getDateStr(code) {
    var date = new Date(code);
    var mArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
            'August', 'September', 'October', 'November', 'December'];
    return mArr[date.getMonth()] + " " + date.getDate()+ ", " + date.getFullYear();  
}

// set middleware

app.get('/', function(req, res) {
    var urlStr = req.protocol + '://' +req.get('host') + "/";
    
    var str = 
        "<h1>Kevin's <i>Timestamp Microservice</i></h1>" +
        "<h4>Made for <a href=\"https://www.freecodecamp.com\">" +
        "Free Code Camp</a>'s Back End Development Course</h4>" +
        "<h2>Example usage:</h2>" +
        "<code>" + urlStr + "July%2024,%202003</code><br/>" +
        "<code>" + urlStr + "1059004800</code>" +
        "<h2>Example output:</h2>" +
        '<code>{ "unix": 1059004800, "natural": "July 24, 2003" }</code>';
    res.send(str);
});

app.get('/:timecode', function(req, res) {
    var tc = req.params.timecode;
    var unixCode;
    var dateStr;
    
    if (Number.isInteger(+tc)) {
        unixCode = +tc;
        dateStr = getDateStr(+tc * 1000);
    } else {
        unixCode = new Date(tc).getTime() / 1000;
        if (!isNaN(unixCode)) 
            dateStr = getDateStr(unixCode * 1000);
        else {
            unixCode = null;
            dateStr = null;
        }
    }
    res.send({ unix: unixCode, natural: dateStr });
});

app.listen(port, host);