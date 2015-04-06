#!/usr/bin/env node

'use strict';

var meow = require('meow');
var currentTime = require('./');

var cli = meow({
  help: [
    'Usage',
    '  $ current-time [place]',
    '',
    'Example',
    '  $ current-time brasil',
    '  $ current-time cph, rio de janeiro, lisbon'
  ].join('\n')
}, {
  string: ['_']
});

var place = cli.input[0];

if (place) {
  return currentTime(place);
}

console.error('Invalid place');
process.exit(1);
