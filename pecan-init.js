#!/usr/bin/env node

var fs        = require('fs'),
    url       = require('url'),
    http      = require('http'),
    prompt    = require('prompt'),
    pecanApp  = require('commander'),
    pecanInfo = require('./package.json');

pecanApp
  .parse(process.argv);

console.log('Lets get your directory setup.');
console.log('Downloading PyProcessing lib');

// Download PyProcessing Repo
var dir = './PyProcessing';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
} else {
  console.log('PyProcessing lib already exists... skipping');
}
console.log('Let\'s get some details.');

// get app entry point
prompt.message   = "";
prompt.delimiter = "";
prompt.start();
var appInfo = {
  properties: {
    appEntryPoint: {
      message: 'Application Entrypoint: ',
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
  console.log(result.appEntryPoint);
  console.log(result.contributors);
});
