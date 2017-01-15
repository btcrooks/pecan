#!/usr/bin/env node

var fs       = require('fs'),
    url      = require('url'),
    http     = require('http'),
    shjs     = require('shelljs'),
    prompt   = require('prompt'),
    download = require('download'),
    pecanApp = require('commander'),

    // PyProcessig Repo and destination
    pypRepo      = 'https://github.com/jdf/processing.py/archive/master.zip',
    pecanLib     = process.env.HOME + '/.pecan',
    pypFolder    = '/processing.py-master',
    pecanConfig  = './config.pecan';

pecanApp
  .parse(process.argv);

var setupPecanProject = function () {
  console.log('Let\'s get some details.');

  // Setup config file
  prompt.message   = '';
  prompt.delimiter = '';
  prompt.start();
  var appInfo = {
    properties: {
      name: {
        message: 'Project Name:',
        required: false
      },
      main: {
        message: 'Entrypoint:',
        pattern: /\w*.py$/,
        default: 'main.py',
        required: true,
        description: 'Your projects entry point. (This would be your .pde file in a standard sketch project).'
      },
      author: {
        message: 'Author:',
        required: false
      },
      contributors: {
        message: 'Contributor(s):',
        required: false
      }
    }
  };

  prompt.get(appInfo, function (err, result){
    // Create Pecan run file
    console.log('');
    console.log('Your Pecan project has been created!');
    console.log(JSON.stringify(result, null, 2));

    var wstream = fs.createWriteStream(pecanConfig);
    wstream.write(JSON.stringify(result, null, 2));
    wstream.end(function () { console.log(pecanConfig, 'file saved.'); });
  });
};

// Check if project already exists
if (fs.existsSync(pecanConfig)) {
  console.log('Pecan project already exists!');
  process.exit(1);
} else {
  // Begin Setup
  console.log('Lets get your Project setup.');
  console.log('Cecking if PyProcessing lib is installed');

  // Check if PyProcessing libs are already installed
  if (!fs.existsSync(pecanLib + pypFolder)){
    // Lib not installed
    // Create directory
    shjs.mkdir('-p', pecanLib + pypFolder);
    // Download PyProcessing Repo
    new download({mode: '755', extract: true})
      .get(pypRepo)
      .dest(pecanLib + pypFolder)
      .run(function (err, files) {
        console.log('Downloaded sucessfull: ' + files);
        setupPecanProject();
      });
  } else {
    console.log('PyProcessing lib already exists... skipping');
    setupPecanProject();
  }
}
