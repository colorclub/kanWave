const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');
var bodyParser = require('body-parser');

var middleware = require('./config/middleware.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.sendfile('client/index.html');
});

middleware(app, express);

app.listen(port, function(err) {
  if(err) {
    return console.log('Error occurred: ', err);
  }
  console.log('Server is listening on port ', port);
})
