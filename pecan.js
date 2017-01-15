#!/usr/bin/env node

var fs        = require('fs'),
    prompt    = require('prompt'),
    pecanApp  = require('commander'),
    pecanInfo = require('./package.json');

// Setup Project
pecanApp
  .version(pecanInfo.version)
  .command('init', 'Create new PyProcessing project')

  // Run Project
  .command('run', 'Run PyProcessing file')

  // View PyProcessing Docs
  .command('docs', 'View PyProcessing docs');

/**
* TODO:
*  - Update PyProcessing Lib
*  - Update Pecan
*/

pecanApp.parse(process.argv);
