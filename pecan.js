#!/usr/bin/env node

var fs        = require('fs'),
    url       = require('url'),
    http      = require('http'),
    prompt    = require('prompt'),
    pecanApp  = require('commander'),
    pecanInfo = require('./package.json');

// Setup Project
pecanApp
  .version(pecanInfo.version)
  .command('init', 'Create new PyProcessing project');

// Run Project
pecanApp
  .command('run', 'Run Pyprocessing file');

pecanApp.parse(process.argv);
