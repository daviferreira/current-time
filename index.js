'use strict';

var parseString = require('xml2js').parseString;
var request = require('superagent');

module.exports = {
  init: function (places) {
    this.places = places;
    this.getCoords();
  },

  getCoords: function () {
    this.places.join(' ').split(',').forEach(function (place) {
      request
        .get('http://api.openweathermap.org/data/2.5/weather')
        .query({ q: place.trim() })
        .end(this.getCurrentTime);
    }.bind(this));
  },

  getCurrentTime: function (err, res) {
    if (err) {
      console.error(err);
    } else {
      var place = res.body.name;
      var temperature = (res.body.main.temp - 273.15).toFixed(1);
      var weather = res.body.weather[0].description;
      var lon = res.body.coord.lon;
      var lat = res.body.coord.lat;
      request
        .get('http://www.earthtools.org/timezone/' + lon + '/' + lat)
        .buffer()
        .type('xml')
        .end(function (err, res) {
          if (err) {
            console.error('error');
          } else {
            parseString(res.text, function (err, result) {
              console.log(result.timezone.isotime[0]);
              console.log(place);
              console.log(temperature); // kelvin => celsius
              console.log(weather);
              console.log(' ### ');
            });
          }
        });
    }
  }
};
