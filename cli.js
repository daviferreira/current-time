#!/usr/bin/env node

'use strict';

var meow = require('meow');
var currentTime = require('./');

var cli = meow({
  help: [
    'Usage',
    '  $ current-time [places]',
    '',
    'Example',
    '  $ current-time brasil',
    '  $ current-time copenhagen, rio de janeiro, lisbon'
  ].join('\n')
}, {
  string: ['_']
});

var places = cli.input;

if (places.length > 0) {
  return currentTime.init(places);
}

console.error('Invalid places');
process.exit(1);
