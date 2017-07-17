const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const Connector = require('../src/exchange/connector');
const config = require('../etc/index');

describe('The exchange rate api connector:', function () {
  const connector = new Connector(config);
  it('returns latest exchange rates', function () {
   return connector.getLatest()
      .then(function (data) {
        assert.typeOf(data, 'object');
        data.should.have.property('rates');
      });
  });
  it('returns latest EUR exchange rates', function () {
   return connector.getLatest({base: 'EUR'})
      .then(function (data) {
        assert.typeOf(data, 'object');
        data.should.have.property('base');
        expect(data.base).to.equal('EUR');
      });
  });
  it('returns historical exchange rates', function () {
   return connector.getHistorical({history: '2015-11-11'})
      .then(function (data) {
        assert.typeOf(data, 'object');
        data.should.have.property('date');
        expect(data.date).to.equal('2015-11-11');
      });
  });
  it('returns historical EUR exchange rates', function () {
   return connector.getHistorical({history: '2015-11-11', base: 'EUR'})
      .then(function (data) {
        assert.typeOf(data, 'object');
        data.should.have.property('date');
        expect(data.date).to.equal('2015-11-11');
        expect(data.base).to.equal('EUR');
      });
  });
});