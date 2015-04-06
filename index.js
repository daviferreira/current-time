'use strict';

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
        .end(function (err, res) {
          if (err) {
            console.error(err);
          } else {
            console.log(' --- ');
            console.log(place);
            console.log(res.body.coord);
            console.log(res.body.weather);
            console.log(res.body.main);
            console.log(res.body.main.temp - 273.15); // if celsius
            console.log(' --- ');
          }
        });
    });
  }
};
