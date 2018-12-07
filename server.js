var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');
//var calculator = require('./calculator.handlebars');
//var MongoClient = require('mongodb').MongoClient;

 /*var mongoHost = process.env.MONGO_HOST;
 var mongoPort = process.env.MONGO_PORT || '27017';
 var mongoUsername = process.env.MONGO_USERNAME;
 var mongoPassword = process.env.MONGO_PASSWORD;
 var mongoDBName = process.env.MONGO_DB_NAME;
*/
var mongoHost = "classmongo.engr.oregonstate.edu";
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = "cs290_coppan";
var mongoPassword = "cs290_coppan";
var mongoDBName = "cs290_coppan";

var mongoURL = "mongodb://" +
  mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
  "/" + mongoDBName;

var mongoDB = null;
//var data = require('./mongoDbFile');

var app = express();
var port = process.env.PORT || 8181;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res, next){
  res.status(200).render('calculator');
});

app.get('/formulas', function(req,res,next){
  var eq = mongoDB.collection('formulas');
  var eqCursor = eq.find({});
  eqCursor.toArray(function(err,eqDocs){
    if(err){
      res.status(500).send("Error fetching formulas from database.");
    }else if(eqDocs.length > 0){
      res.status(200).render('formulas', {
        formula: eqDocs});
    }
  });
});

app.post('/addformula', function(req, res, next){
  var item = {formula: req.body.formula};
  var formulaCollection = mongoDB.collection('formulas');
  formulaCollection.insertOne(item,
   function(err, result){
    if(err){
      res.status(500).send("Error saving formula to DB");
    }//else if(result.matchedCount > 0){
      res.status(200).send("Success");
    //}else{
    //  res.status(404).send("We couldn't fine what you are looking for");
    //}
});
});

/*app.post('/updateformula', function(req, res, next){
  var item = {formula: req.body.formula};
  var formulaCollection = mongoDB.collection('formulas');
  formulaCollection.updateOne(item,
   function(err, result){
    if(err){
      res.status(500).send("Error saving formula to DB");
    }//else if(result.matchedCount > 0){
      res.status(200).send("Success");
    //}else{
    //  res.status(404).send("We couldn't fine what you are looking for");
    //}
});
});*/

/*app.post('/rmall', function(req,res,next){
  var formulaCollection = mongoDB.collection('formulas');
  formulaCollection.deleteOne({"formula":'x+y'});
});*/

MongoClient.connect(mongoURL, function(err, client){
  if(err){
      throw err;
  }
  console.log("It worked!");
  mongoDB = client.db(mongoDBName);
  app.listen(port, function(){
    console.log("==Server is listening on port", port);
  });
});
