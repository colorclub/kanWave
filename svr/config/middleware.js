var path = require('path');

module.exports = function (app, express) {
  app.use(express.static(path.join(__dirname, '/../../node_modules')));
  app.use(express.static(path.join(__dirname, '/../../client')));
};
