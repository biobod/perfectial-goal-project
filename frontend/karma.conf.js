const webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'], // run in Chrome
    singleRun: true, // just run once by default
    frameworks: ['jasmine'], // use the mocha test framework
    files: [
      'test/index_test.js',
    ],
    mode: 'development',
    preprocessors: {
      'test/index_test.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'], // report results in this format
    webpack: { // kind of a copy of your webpack config
      devtool: 'inline-source-map', // just do inline source maps instead of the default
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
    },
    webpackServer: {
      noInfo: true, // please don't spam the console when running in karma!
    },
  });
};
