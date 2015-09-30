#!/usr/bin/env node

var fs        = require('fs'),
    sys       = require('sys'),
    exec      = require('child_process').exec,
    pecanApp  = require('commander'),
    pecanInfo = require('./package.json');

pecanApp
  .parse(process.argv);

console.log('Running PyProcessing app.');

function puts(error, stdout, stderr) {
  console.log(stdout);
}
exec('bash ./run.pecan', puts);
