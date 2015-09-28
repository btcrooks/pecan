#!/usr/bin/env node

var fs = require('fs'),
    url = require('url'),
    http = require('http'),
    exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    ghDownload = require('github-download'),
    pecanApp = require('commander'),
    pecanInfo = require('./package.json');


pecanApp.version(pecanInfo.version)

pecanApp
  .command('init', 'Create new PyProcessing project')
  .alias('i')
  .action(function(){
    console.log('Creating new project');
    // PyProcessing Repo
    ghDownload({user: 'jdf', repo: 'processing.py', ref: 'master'}, process.cwd())
    .on('dir', function(dir) {
      console.log(dir)
    })
    .on('file', function(file) {
      console.log(file)
    })
    .on('zip', function(zipUrl) { //only emitted if Github API limit is reached and the zip file is downloaded
      console.log(zipUrl)
    })
    .on('error', function(err) {
      console.error(err)
    })
    .on('end', function() {
      exec('tree', function(err, stdout, sderr) {
        console.log(stdout)
      })
    })
  }).on('--help', function() {
    console.log(' Run to create new projects... its simple.');
  });


pecanApp.parse(process.argv);
