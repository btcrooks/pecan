#!/usr/bin/env node

var fs = require('fs'),
    url = require('url'),
    http = require('http'),
    pecanApp = require('commander'),
    pecanInfo = require('./package.json');


pecanApp.version(pecanInfo.version)

pecanApp
  .command('init', 'Create new PyProcessing project')
  .alias('i')
  .action(function(){
    console.log('Creating new project');
    // PyProcessing Repo

  }).on('--help', function() {
    console.log(' Run to create new projects... its simple.');
  });


pecanApp.parse(process.argv);
