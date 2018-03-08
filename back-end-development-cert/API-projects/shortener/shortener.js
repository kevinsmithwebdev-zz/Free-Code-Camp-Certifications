// load what we need
var express = require('express');
var base62 = require('base62');
var validUrl = require('valid-url');
var mongo = require('mongodb');

var isLocal = (process.argv[2]=="local");

var port = (!isLocal)?process.env.PORT:1337;
var host = (!isLocal)?process.env.IP:'127.0.0.1';

var collName = "muUrls";

var dbUrl = "";

if (isLocal)
  dbUrl = "mongodb://localhost:27017/mydb";
else
  dbUrl = "mongodb://" + process.env.DB_USR + ":" + process.env.DB_PWD +
            "@ds153521.mlab.com:53521/ksj-fccbe-shortener";

// start the server

var app = express();
app.use('/',express.static('public'));
// set middleware

mongo.connect(dbUrl, function(err, db) {
  if (err) {
      console.log("Could not connect to database.");
      throw (err);
  }
  var myDB = db.collection(collName);

  //********************/
  // eliminate phantom calls for favicon.ico

  app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
  });

  //********************/
  // list function for maint, but why not

  app.get('/list', function(req, res) {

    var addressStem = req.protocol + '://' + req.get('host') + "/";

    var str = "listing database ...<br/><br/>";
    myDB.find().toArray(function(err, documents) {
      if (err) throw err;
      documents.map((d) => {
        if (d.code != undefined)
          str += "{ original_url: \"" + d.original_url + "\", code: " + d.code + " } which can be accesed at <b>" + addressStem + base62.encode(d.code) + "</b><br/><br/>";
        else {
          str += "{ max_code: " + d.max_code + " } (which renders to <b>" + base62.encode(d.max_code) + "</b> in our base 62 code)<br/><br/>";
        }
      });
      res.send(str);
    }) // myDB.find().toArray()
  }); // app.get

  //********************/
  // blank call for usage info

  app.get('/', function(req, res) {
    var addressStem = req.protocol + '://' +req.get('host') + "/";
    var str =
          "<h1>Kevin's <i>URL Shortener Microservice</i></h1>" +
          "<h4>Made for <a href=\"https://www.freecodecamp.com\">" +
            "Free Code Camp</a>'s Back End Development Course</h4>" +
          "<h4>Made by Kevin Smith (ksjazzguitar)</h4>" +
          "<hr>" +
          "<h2>Example usage:</h2>" +
          "<h3><i>Create a new shortened url:</i></h3>" +
          "<h4 style=\"color:#c00;\"><code>" + addressStem +
            "new/http://www.kevinsmithguitar.com/</code></h4>" +
          "<h4>returns:</h4>" +
          "<h4 style=\"color:#c00;\"><code>{ \"original_url\": " +
            "\"http://www.kevinsmithguitar.com/\", " +
            "\"short_url\": \"" + addressStem + "AMfX\" }</code></h4>" +
          "<h3><i>Accessing your site via shortened URL code:</i></h3>" +
          "<h4 style=\"color:#c00;\"><code>" + addressStem + "AMfX</code></h4>" +
          "<h4>redirects to:</h4>" +
          "<h4 style=\"color:#c00;\"><code>" + addressStem +
            "new/http://www.kevinsmithguitar.com/</code></h4>" +
          "<h3><i>And you can access a list of all DB documents (but that's a secret, don't tell anyone):</i></h3>" +
          "<h4 style=\"color:#c00;\"><code>" + addressStem +
            "list</code></h4>" +
          "<hr>" +
          "<h2>Explanation:</h2>" +
          "<h5>Valid URLs are stored in a database with a code which " +
          "is rendered and accessed in base 62 (for maximum compactness). " +
          "For the purposes of this example, the database is starting with a high " +
          "code number, because it looks cooler with a four digit base 62 code rather " +
          "than starting with single digits. OK, I'm vain, so sue me.</h5>";
    res.send(str);
  }); // app.get

  //********************/
  // calling with url, asking for shortened code

  app.get('/new/:bigUrl(*)', function(req, res) {

      var addressStem = req.protocol + '://' + req.get('host') + "/";
      var baseUrlStr = req.protocol + '://' + req.get('host') + '/';
      var bigUrl = req.params.bigUrl;

      if (validUrl.isUri(bigUrl)) {

          myDB.find( { max_code : { $exists : true } } ).toArray(function(err, docs) {
            if (err) console.log(err);
            var maxCode = docs[0].max_code;
            myDB.insert({ original_url: bigUrl, code: maxCode+1});
            myDB.update({ max_code : { $exists : true } },
                          { $inc: { max_code: 1 } });
            res.json({ original_url: bigUrl, short_url: addressStem + base62.encode(maxCode+1) });
          });

      } else { // not a valid url
          res.json({ error: "\"" + bigUrl + "\" is not a full, valid URL"});
      }
  }); // app.get

  //********************/
  // calling with shortened code, asking for page

  app.get('/:urlCode62', function(req, res) {

    var urlCode62 = req.params.urlCode62;
    if (!(/[^a-z\d]/i).test(urlCode62)) { // test if valid code62
        var urlCode10 = base62.decode(urlCode62);
        myDB.find( { code: urlCode10 } ).toArray(function(err, docs) {
          if (docs.length > 0)
            res.redirect(docs[0].original_url);
          else
            res.json({ error: urlCode62 + ' is not in out database'});
        });
    } else {
        res.json({ error: urlCode62 + ' is not a valid tiny URL code (must be base 62 encoded)'});
    }
  }); // app.get

}); // mongo.connect



// launch app
app.listen(port, host, function() { console.log("shortener server is running on port " +
        port + " and host " + host + " ...")});
