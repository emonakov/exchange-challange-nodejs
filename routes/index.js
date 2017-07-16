const express = require('express');
const router = express.Router();
const Connector = require('../src/exchange/connector');
const config = require('../etc/index');

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

router.get('/historical', function(req, res, next) {
  let connector = new Connector(config);
  let params = req.query;
  connector
    .getHistorical(params)
    .then(function (data) {
      res.json(data);
    }, function (err) {
      console.log(err);
      next(Connector.createError(err));
    });
});

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
