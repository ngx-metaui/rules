// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const {join} = require('path');
const getBaseKarmaConfig = require('../../karma.conf');

module.exports = function (config) {
  const baseConfig = getBaseKarmaConfig();
  config.set({
    ...baseConfig,
    coverageIstanbulReporter: {
      ...baseConfig.coverageIstanbulReporter,
      dir: join(__dirname, '../../coverage/libs/rules')
    },
    browsers: ['Chrome', 'ChromeHeadlessCI'],
    customLaunchers: {
      "ChromeHeadlessCI": {
        "base": "ChromeHeadless",
        "flags": [
          "--window-size=1024,768",
          "--no-sandbox"
        ]
      }
    },
    singleRun: true

  });
};
