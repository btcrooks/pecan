#!/usr/bin/env node

var fs        = require('fs'),
    url       = require('url'),
    http      = require('http'),
    prompt    = require('prompt'),
    pecanApp  = require('commander'),
    pecanInfo = require('./package.json');

pecanApp
  .parse(process.argv);

// Check it project already exists
if (fs.existsSync('./run.pecan')) {
  console.log('Pecan project already exists!');
  process.exit(1);
} else {
  // Begin Setup
  console.log('Lets get your directory setup.');
  console.log('Downloading PyProcessing lib');

  // Download PyProcessing Repo
  var dir = './PyProcessing';
  // Check if PyProcessing libs are already installed
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  } else {
    console.log('PyProcessing lib already exists... skipping');
  }
  console.log('Let\'s get some details.');

  // Setup `run.sh` file
  // get app entry point
  prompt.message   = "";
  prompt.delimiter = "";
  prompt.start();
  var appInfo = {
    properties: {
      projectEntrypoint: {
        message: 'Application Entrypoint: ',
        pattern: /\w*.py$/,
        default: 'main.py',
        required: true
      },
      contributors: {
        message: 'Contributor(s): ',
        required: false
      }
    }
  };

  prompt.get(appInfo, function (err, result){
    var wstream = fs.createWriteStream('./run.pecan');
    wstream.write('#/usr/bin/env bash \n');
    wstream.write('# \n');
    wstream.write('# Pecan run file \n');
    wstream.write('# Contributors: ' + result.contributors + '\n');
    wstream.write('# Project Entrypoint: ' + result.projectEntrypoint + '\n');

    // dev testing only
    wstream.write('echo "File is running :)" \n');

    wstream.end( function () {
      console.log('Created pecan run file!');
    });

    console.log('run `$ pecan run` to run your PyProcessing project.');
  });
}
