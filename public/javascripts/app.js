var application = function () {
  return function () {
    var app = new Vue({
      el: '#app',
      data: {
        latest: null,
        historical: null,
        base: null,
        history: null,
        error: null
      },
      created: function () {
        this.fetchLatest();
      },
      methods: {
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
        renderResponse: function (data) {
          this.latest = data.body;
          this.error = null;
        },
        errorHandler: function (error) {
          this.error = error.body.error;
          this.latest = null;
        },
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
  var container = document.getElementById('container');
  var picker = new Pikaday({
    field: document.getElementById('datepicker'),
    container: document.getElementById('container'),
    firstDay: 1,
    minDate: new Date(1990, 12, 31),
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