const Service = require('./service/fixer');

/**
 * this is a Connector class which is a adaptor
 * for any type of services.
 * This is free fixer.io this time
 */
class Connector {
  constructor(config) {
    this.service = new Service(config);
  }
  getLatest(params) {
    return this.service.getLatest(params);
  }
  getHistorical(params) {
    return this.service.getHistorical(params);
  }
  getAvailableCurrency() {
    return this.service.getAvailableCurrency();
  }
  static createError(err) {
    err = new Error('Data too old');
    err.json = true;
    return err;
  }
}

module.exports = Connector;