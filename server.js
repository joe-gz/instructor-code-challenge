var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require('fs');
var path = require('path');
var request = require('request');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// app.use('/', express.static(path.join(__dirname, 'public'));

app.get('/', function(req, res){
  res.render( "index.html" )
})

app.get('/favorites', function(req, res){
  console.log("Running?");
  var data = JSON.parse(fs.readFileSync('./data.json'));
  console.log(data);
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    console.log(req.body.name);
    var data = JSON.parse(fs.readFileSync('./data.json'));
    data.push(req.body);
    fs.writeFile('./data.json', JSON.stringify(data));
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } else {
    console.log(req.body.name);
    res.send("Error");
  }
});

app.listen(process.env.PORT || 4000, function(){
  console.log("Listening on port 4000");
});
