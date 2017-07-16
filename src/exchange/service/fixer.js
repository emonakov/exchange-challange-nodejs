const Interface = require('./interface');
const queryString = require('querystring');
const request = require('request');
const NodeCache = require('node-cache');
const cache = new NodeCache();


class Fixer extends Interface {
  constructor(config) {
    super();
    this.apiUrl = config.exchange.api_url;
    this.latestEndpoint = config.exchange.endpoints.latest;
    this.historicalEndpoint = config.exchange.endpoints.historical;
  }

  getLatest(params) {
    if (!params) {
      params = [];
    }
    let url = this.apiUrl + this.latestEndpoint;
    params = queryString.stringify(params);
    url = url + '?' + params;
    return new Promise(function (resolve, reject) {
      try {
        return resolve(cache.get(url, true));
      } catch (err) {}
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let info = JSON.parse(body);
          info.url = url;
          cache.set(url, info, 7200);
          resolve(info);
        } else {
          return reject(error);
        }
      });
    });
  }

  getHistorical(params) {
    if (!params.history) {
      return false;
    }
    let url = this.apiUrl + this.historicalEndpoint;
    let date = params.history;
    delete params.history;
    params = queryString.stringify(params);
    url = url + date + '?' + params;
    return new Promise(function (resolve, reject) {
      try {
        return resolve(cache.get(url, true));
      } catch (err) {}
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let info = JSON.parse(body);
          info.url = url;
          cache.set(url, info);
          resolve(info);
        } else {
          return reject(error);
        }
      });
    });
  }

  getAvailableCurrency() {
    let dataPromise = this.getLatest();
    return new Promise(function (resolve, reject) {
      try {
        return resolve(cache.get('currencies', true));
      } catch (err) {}
      dataPromise.then(function (data) {
        let currencies = Object.keys(data.rates);
        currencies.push(data.base);
        currencies.sort();
        cache.set('currencies', currencies);
        resolve(currencies);
      }, function (err) {
        return reject(err);
      });
    });
  }
}

module.exports = Fixer;