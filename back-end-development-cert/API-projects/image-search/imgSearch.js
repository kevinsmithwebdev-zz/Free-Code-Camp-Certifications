// load what we need
var express = require('express');
var mongo = require('mongodb');
var request = require('request-promise');

var isLocal = (process.argv[2]=="local");

var port = (!isLocal)?process.env.PORT:1337;
var host = (!isLocal)?process.env.IP:'127.0.0.1';

var collName = "imgSearches";

var gCseId = process.env.G_CSE;
var gApiKey = process.env.G_KEY;

var dbUrl = "";

if (isLocal)
  dbUrl = "mongodb://localhost:27017/mydb";
else
  dbUrl = "mongodb://" + process.env.DB_USR + ":" + process.env.DB_PWD +
            "@ds161041.mlab.com:61041/ksj-fccbe-imgsearch";

var app = express();
app.use('/',express.static('public'));
// set middleware

mongo.connect(dbUrl, function(err, db) {
  if (err) {
      console.log("Could not connect to database.");
      throw (err);
  }
  var myDB = db.collection(collName);
  //********************/// eliminate phantom calls for favicon.ico
  app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
  });
  //********************/// latest searches



  app.get('/latest', function(req, res) {

    var latestArr = [];

    myDB.find().toArray(function(err, documents) {
      if (err) throw err;
      documents.map((d) => {
        latestArr.unshift( { term: d.term, when: d.when } );
      });
      res.json(latestArr);
    }); // myDB.find().toArray()
  }); // app.get





  //********************/// blank call for usage info
  app.get('/', function(req, res) {
    var addressStem = req.protocol + '://' +req.get('host') + "/";

    var str =
          "<h1>Kevin's <i>Image Search Abstraction Layer</i></h1>" +
          "<h4>Made for <a href=\"https://www.freecodecamp.com\">" +
           "Free Code Camp</a>'s Back End Development Course</h4>" +
          "<h4>Made by Kevin Smith (ksjazzguitar)</h4>" +
          "<hr>" +
          "<h2>Example usage:</h2>" +
          "<h3><i>Search for images:</i></h3>" +
          "<h4 style=\"color:#c00;\"><code>" + addressStem +
           "search?q=barcelona</code></h4>" +
          "<h3>or with an offset:</h3>" +
          "<h4 style=\"color:#c00;\"><code>" + addressStem +
           "search?q=barcelona&offset=10</code></h4>" +
          "<h3>or see the latest searches:</h3>" +
          "<h4 style=\"color:#c00;\"><code>" + addressStem +
           "latest</code></h4>" +
          "<hr>";
    res.send(str);
  }); // app.get

  //********************/// calling with url, asking for shortened code
//      http://localhost:1337/search?q=wowsers&offset=127
  app.get('/search', function(req, res) {
    var addressStem = req.protocol + '://' + req.get('host') + "/";
    var q = req.query.q;

    if (!q )
      res.send("Invalid query string: \"" + q + "\"");
    myDB.insert({ term: q, when: new Date().toISOString() } );
    var offsetStr = "";
    if (+req.query.offset>=1)
      offsetStr = "&start="+req.query.offset;

    var url = "https:\/\/www.googleapis.com/customsearch/v1?q=" + q + "&num=10" + offsetStr + "&safe=high&cx=" + gCseId + "&key=" + gApiKey + "&alt=json";

    const options = { method: 'GET', uri: url }

    request(options)
      .then(function (dataJson) {
      //  fs.writeFile('./data.json',data);
        var data = JSON.parse(dataJson);
        var thumbSrc;
        var imageSrc;

        var dataArr = [];

        for (var i = 0; i < 10; i++) {
          try {
            thumbSrc = data.items[i].pagemap.cse_thumbnail[0].src;
          } catch(e) {
            thumbSrc = '';
          }

          try {
            imageSrc = data.items[i].pagemap.cse_image[0].src;
          } catch (e) {
            imageSrc = '';
          }
          dataArr.push({ url: imageSrc, snippet: data.items[i].snippet, thumbnail: thumbSrc })
        }
        res.send(JSON.stringify(dataArr));
      })
      .catch(function (err) {
        console.log("error");
      });



  }); // app.get
}); // mongo.connect


// launch app
app.listen(port, host, function() { console.log("imgsearch server is running on port " +
        port + " and host " + host + " ...")});
