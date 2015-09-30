#!/usr/bin/env node

var fs        = require('fs'),
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

// Update PyProcessing Lib
// Update Pecan

pecanApp.parse(process.argv);
