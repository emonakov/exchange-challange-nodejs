var application = function () {
  return function () {
    // instantiates Vue application inside #app element
    var app = new Vue({
      el: '#app',
      // reactive properties
      data: {
        latest: null,
        historical: null,
        base: null,
        history: null,
        error: null,
        chart: null,
        chartCurrency: ['AUD', 'CAD', 'CHF', 'CZK', 'GBP', 'EUR', 'HKD', 'USD', 'RUB']
      },
      // called when application's just been instantiated
      created: function () {
        this.fetchLatest();
      },
      // methods of the app. could be run from the app scope
      // in html
      methods: {
        // fetches latest currency rates
        // can set different base currency
        fetchLatest: function () {
          this.base = document.querySelector('#currency-select').value;
          if (this.history) {
            this.fetchHistorical();
          } else {
            this.$http.get('/latest?base=' + this.base)
              .then(
                this.renderResponse.bind(this),
                this.errorHandler.bind(this)
              );
          }
        },
        // changing reactive properties
        // and passes data to the chart object
        renderResponse: function (data) {
          this.latest = data.body;
          this.error = null;
          this.renderChart(data);
        },
        // changes the error property
        // to show it
        errorHandler: function (error) {
          this.error = error.body.error;
          this.latest = null;
        },
        // gets new data and renders the chart
        renderChart: function (data) {
          var rates = data.body.rates;
          var values = [];
          var currency = [];
          for (var index in this.chartCurrency) {
            if (this.chartCurrency[index] == data.body.base) {
              continue;
            }
            currency.push(this.chartCurrency[index]);
            values.push(rates[this.chartCurrency[index]]);
          }
          this.destroyChart();
          // wrapped with interval because it's been loading
          // before important dom elements
          var interval = setInterval(function () {
            if (document.getElementById("myChart")) {
              this.createChart(currency, values);
              clearInterval(interval);
            }
          }.bind(this), 500);
        },
        // creates chart object
        createChart: function (currency, values) {
          var ctx = document.getElementById("myChart").getContext('2d');
          this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: currency,
                datasets: [{
                    label: 'currency rate',
                    data: values,
                    borderWidth: 1
                }]
            }
          });
        },
        // destroys chart object
        destroyChart: function () {
          if (this.chart) {
            this.chart.destroy();
          }
        },
        // fetches currency rate on a given date and base
        fetchHistorical: function () {
          this.history = document.querySelector('#datepicker').value;
          this.$http.get('/historical?history=' + this.history + '&base=' + this.base)
            .then(
              this.renderResponse.bind(this),
              this.errorHandler.bind(this)
            );
        }
      }
    });
  };
}();

document.addEventListener("DOMContentLoaded", application);

window.addEventListener("load", function () {
  // this creates a date picker for a date field
  // allows to select any date from 31 Dec 1999
  var container = document.getElementById('container');
  var picker = new Pikaday({
    field: document.getElementById('datepicker'),
    container: document.getElementById('container'),
    firstDay: 1,
    minDate: new Date(1999, 11, 31),
    maxDate: new Date(),
    yearRange: [1990, 2020],
    format: 'YYYY-MM-DD',
    toString: function (date, format) {
      return dateFns.format(date, format);
    },
    parse: function (dateString, format) {
      return dateFns.parse(dateString);
    }
  });
  picker.show();
  container.addEventListener("mouseover", function () {
    document.getElementById("datepicker").focus();
  });
});