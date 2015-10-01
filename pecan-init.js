#!/usr/bin/env node

var fs        = require('fs'),
    url       = require('url'),
    http      = require('http'),
    prompt    = require('prompt'),
    download  = require('download'),
    pecanApp  = require('commander'),
    pecanInfo = require('./package.json');

var pypRepo = 'https://github.com/jdf/processing.py/archive/master.zip',
    dir = './processing.py-master';

pecanApp
  .parse(process.argv);

var setupPecanProject = function () {
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
    // Creat Pecan run file
    // result.projectEntrypoint
    // result.contributors
  });
};

// Check it project already exists
if (fs.existsSync('./run.pecan')) {
  console.log('Pecan project already exists!');
  process.exit(1);
} else {
  // Begin Setup
  console.log('Lets get your directory setup.');
  console.log('Downloading PyProcessing lib');

  // Check if PyProcessing libs are already installed
  if (!fs.existsSync(dir)){
    // Download PyProcessing Repo
    new download({mode: '755', extract: true})
      .get(pypRepo)
      .dest('./')
      .run(function (err, files) {
        console.log('Downloaded sucessfull: ' + files);
        setupPecanProject();
      });
  } else {
    console.log('PyProcessing lib already exists... skipping');
    setupPecanProject();
  }
}
