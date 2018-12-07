var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// var mongoHost = process.env.MONGO_HOST;
// var mongoPort = process.env.MONGO_PORT || '27017';
// var mongoUsername = process.env.MONGO_USERNAME;
// var mongoPassword = process.env.MONGO_PASSWORD;
// var mongoDBName = process.env.MONGO_DB_NAME;
var mongoHost = "classmongo.engr.oregonstate.edu";
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = "cs290_vandelk";
var mongoPassword = "cs290_vandelk";
var mongoDBName = "cs290_vandelk";

var mongoURL = "mongodb://" +
  mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
  "/" + mongoDBName;

var mongoDB = null;

var app = express();
var port = process.env.PORT || 8180;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', function(req, res, next){
  res.status(200).render('calculator');
});

app.get('/results', function(req, res, next){
    res.status(200).render('results');
  // var resultsCollection = mongoDB.collection('resu');
  // var find = resultsCollection.find({})
  // resultsCollection.find({}).toArray(function(err, input){
  //   if(err){
  //     res.status(500).send("Error connecting to DB.");
  //   }
  //   res.status(200).render('results', {
  //     text: input
  //   });
  // });
});
//MongoClient.connect(mongoURL, function(client, err){
//  if(err){
//      throw err;
//  }
//  console.log("It worked!");
//  mongoDB = client.db(mongoDBName);
  app.listen(port, function(){
    console.log("==Server is listening on port", port);
  });
//});
