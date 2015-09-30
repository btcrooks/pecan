#!/usr/bin/env node

var fs        = require('fs'),
    sys       = require('sys'),
    execSync  = require('exec-sync2'),
    pecanApp  = require('commander'),
    pecanInfo = require('./package.json');

pecanApp
  .parse(process.argv);

function puts(error, stdout, stderr) {
  console.log(stdout);
}

// Check it project already exists
if (!fs.existsSync('./run.pecan')) {
  console.log('Pecan project doesn\'t exist!');
  console.log('Run `$ pecan init` to get started');
  process.exit(1);
} else {
  console.log('Running PyProcessing app.');

  execSync('bash ./run.pecan', puts);
}
