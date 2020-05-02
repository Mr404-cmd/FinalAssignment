var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var entries = [  { name: 'shubham', address: 'Mumbai'},
{ name: 'Saurav', address: 'Pune'},
{ name: 'Rohit', address: 'Nagpur'},
{ name: 'Shivam', address: 'Nasik'},
{ name: 'Rahul', address: 'Varanasi'},
{ name: 'Mansi', address: 'Surat'},
{ name: 'Hemlata', address: 'Jaipur'},
{ name: 'Shraddha', address: 'Bhopal'},
{ name: 'Abhishek', address: 'Jaunpur'},
{ name: 'sushil', address: 'Thane'},
{ name: 'Ajit', address: 'Mumbai'},
{ name: 'Praful', address: 'vapi'},
{ name: 'vishal', address: 'chhatishgadh'},
{ name: 'Ashok', address: 'Mirzapur'} ] 
// a huge array containing the entry objects
MongoClient.connect(url,{ useUnifiedTopology: true },function(err,db){
    if(err) throw err
    var dbo = db.db("viaan");
    var col = dbo.collection('users');
    var batch = col.initializeOrderedBulkOp();
    for (let i = 0; i < entries.length; i++) {
        const val=entries[i]
        batch.insert(val)
    }
    batch.execute(function(err, result) {
    console.dir(err);
    console.dir(result);
    db.close();
})
})