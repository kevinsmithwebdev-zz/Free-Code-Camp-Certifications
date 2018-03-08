// install what we need

var express = require('express');
var multer  = require('multer');

var upload = multer( { dest: 'uploads/' });

var isLocal = (process.argv[2]=="local");

var port = (!isLocal)?process.env.PORT:1337;
var host = (!isLocal)?process.env.IP:'127.0.0.1';

var app = express();

// middleware

app.use(express.static(__dirname + '/public'));

app.post('/upload', upload.single('file'), function(req, res) {
  return res.json({ size: req.file.size } );
});

// launch app

var localStr = (isLocal)?"locally ":"";
app.listen(port, host, function() { console.log("sizer server is running " + localStr + "on port " +
        port + " and host " + host + " ...")});
