const express = require('express');
const router = express.Router();
const Connector = require('../src/exchange/connector');
const config = require('../etc/index');

// main entry point. Renders the main page with a currency selector
router.get('/', function(req, res, next) {
  let connector = new Connector(config);
  connector
    .getAvailableCurrency()
    .then(function (data) {
      res.render('index', { title: 'Exchange Challenge', currency: data });
    }, function (err) {
      next(Connector.createError(err));
    });
});

// historical endpoint. Sends out json response
// to the browser with either correct response from the
// api or error
router.get('/historical', function(req, res, next) {
  let connector = new Connector(config);
  let params = req.query;
  connector
    .getHistorical(params)
    .then(function (data) {
      res.json(data);
    }, function (err) {
      next(Connector.createError(err));
    });
});

// latest endpoint. Sends out json response
// to the browser with either correct response from the
// api or error
router.get('/latest', function(req, res, next) {
  let connector = new Connector(config);
  let params = req.query;
  connector
    .getLatest(params)
    .then(function (data) {
      res.json(data);
    }, function (err) {
      next(Connector.createError(err));
    });
});

module.exports = router;
