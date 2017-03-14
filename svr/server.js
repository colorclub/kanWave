const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');
const path = require('path')
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../../node_modules')));
app.use(express.static(path.join(__dirname, '/../../client')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/client/index.html');
});

app.listen(port, function(err) {
  if(err) {
    return console.log('Error occurred: ', err);
  }
  console.log('Server is listening on port ', port);
})
