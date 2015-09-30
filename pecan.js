#!/usr/bin/env node

var fs        = require('fs'),
    url       = require('url'),
    http      = require('http'),
    prompt    = require('prompt'),
    pecanApp  = require('commander'),
    pecanInfo = require('./package.json');

pecanApp
  .version(pecanInfo.version)
  .command('init', 'Create new PyProcessing project')
  .action(function(){
    console.log('Creating new PyProcessing project');
  });

pecanApp.parse(process.argv);
