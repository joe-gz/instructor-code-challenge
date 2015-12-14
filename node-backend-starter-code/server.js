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
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
});

app.get ("/movies", function(req, res) {
  var keyword = "Star Wars"
  // $(".selectpicker option:selected").val();
  console.log(keyword)
  var url = "http://www.omdbapi.com/?s="+keyword
  request(url, function(error, response, body) {
    var movies = JSON.parse(body)
    res.json(movies);
  });
});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error");
    return

    var data = JSON.parse(fs.readFileSync('./data.json'));
    data.push(req.body);
    fs.writeFile('./data.json', JSON.stringify(data));
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  }
});

  app.listen(3000, function(){
    console.log("Listening on port 3000");
  });
