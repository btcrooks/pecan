#!/usr/bin/env node

var fs        = require('fs'),
    sys       = require('sys'),
    shjs      = require('shelljs'),
    pecanApp  = require('commander'),
    pecanInfo = require('./package.json');

pecanApp
  .parse(process.argv);

// Check it project already exists
if (!fs.existsSync('./run.pecan')) {
  console.log('Pecan project doesn\'t exist!');
  // TODO: Prompt user to create a new project
  console.log('Run `$ pecan init` to get started');
  process.exit(1);
} else {
  console.log('Running PyProcessing app.');
  var child = shjs.exec('bash ./processing.py-master/processing-py.sh main.py');
  shjs.exit(0);
}
