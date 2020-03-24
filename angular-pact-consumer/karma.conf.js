// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
var packageJson = require('./package.json');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular','pact'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@pact-foundation/karma-pact'),
      require('@mattersight/karma-pact-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/angular-pact-consumer'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    restartOnFileChange: true,
    pact: [{
      cors: true,
      port: 1234,
      logLevel: 'DEBUG',
      consumer: 'angular-pact-consumer',
      provider: 'spring-pact-provider',
      dir: 'pacts',
      spec: 2
    }],
    pactReporter: {
      pactBroker: 'http://localhost:8088',
      pactFilesOrDirs: [require('path').join(__dirname, 'pacts')],
      consumerVersion: packageJson.version,
      appendGitCommitHashToVersion: false,
      addGitBranchNameToTags: true,
      tags: []
    }
  });
};
