var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', function(req, res, next){
  //res.sendFile(__dirname + 'calculator.html');
  res.status(200).render('calculator', {});
});

app.get('/results', function(req, res, next){
  //res.sendFile(__dirname + 'calculator.html');
  res.status(200).render('results', {});
});

app.listen(port, function(){
  console.log("==Server is listening on port", port);
});
