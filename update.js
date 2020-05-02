var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("viaan");
  var col = dbo.collection('userBackup');
  var batch = col.initializeOrderedBulkOp();
  dbo.collection("users").find({}).toArray(function(err, result) {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
        const val=result[i]
        batch.insert(val)
    }
    batch.execute(function(err, result) {
        console.dir(err);
        dbo.collection("users").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("users deleted");
            db.close();
        })
    })
  })
});