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
      dir: join(__dirname, '../../coverage/libs/primeng-rules')
    },
    browsers: ['Chrome', 'ChromeHeadless'],
    flags: [
      '--window-size=1024,768',
      '--disable-web-security',
      '--disable-gpu',
      '--no-sandbox'
    ],
    singleRun: true

  });
};
