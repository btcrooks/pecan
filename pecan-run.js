#!/usr/bin/env node

var fs        = require('fs'),
    sys       = require('sys'),
    exec      = require('child_process').exec,
    shell     = require('shelljs');
    pecanApp  = require('commander'),
    pecanInfo = require('./package.json');

pecanApp
  .parse(process.argv);

function execSync(command) {
  // Runn command in a subshell
  exec(command + ' 2>&1 1>output && echo done! > done');

  // Block the event loop untill the command has executed
  while (!fs.existsSync('done')) {
    // do nothing
  }
  // Read the output
  var output = fs.readFileSync('output');

  // Delete temporary files.
  fs.unlinkSync('output');
  fs.unlinkSync('done');

  return output;
}

// Check it project already exists
if (!fs.existsSync('./run.pecan')) {
  console.log('Pecan project doesn\'t exist!');
  console.log('Run `$ pecan init` to get started');
  process.exit(1);
} else {
  console.log('Running PyProcessing app.');
  execSync('bash ./processing.py-master/processing-py.sh ./main.py');
}
