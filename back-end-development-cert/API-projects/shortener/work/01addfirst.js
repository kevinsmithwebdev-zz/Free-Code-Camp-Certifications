var mongo = require('mongodb').MongoClient;

var myUrl = 'mongodb://localhost:27017/mydb';

mongo.connect(myUrl, function(e, db) {
  if (e) throw e;

  var doc =  { original_url: "http://www.kevinsmithguitar.com/",
              code: 8765309 }

  var collection = db.collection('muUrls');
  collection.insert(doc, function(err, data) {
    if (err) throw err;
    console.log(JSON.stringify(doc));
    db.close();
  });
});
