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

app.post('/search', function(req, res) {
  var options = {
    method: 'GET',
    url: 'https://api.cognitive.microsoft.com/bing/v5.0/search?q=' + req.body.query +'&count=20  ',
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.key || require('./config/key.js')
    }
  }
  request(options, function(error, response, body) {
    if(error) console.log("THERE IS AN ERROR IN SERVER REQUEST")
    res.json(response);
  });

});

middleware(app, express);

app.listen(port, function(err) {
  if(err) {
    return console.log('Error occurred: ', err);
  }
  console.log('Server is listening on port ', port);
})
