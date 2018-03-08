var mongo = require('mongodb').MongoClient;

var myUrl = 'mongodb://localhost:27017/mydb';

mongo.connect(myUrl, function(e, db) {
  if (e) throw e;

  var docs =  [
            {
              original_url: "https://www.google.com/",
              code: 8765310
            },
            {
              original_url: "https://docs.mongodb.com/manual/reference/mongo-shell/",
              code: 8765311
            },
            {
              original_url: "https://www.lonelyplanet.com/spain/barcelona",
              code: 8765312
            }
            ];

  var collection = db.collection('muUrls');
  collection.insert(docs, function(err, data) {
    if (err) throw err;
    console.log(JSON.stringify(docs));
    db.close();
  });
});
