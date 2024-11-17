// config-overrides.js
const webpack = require('webpack');

module.exports = {
  webpack: function(config, env) {
    config.resolve.fallback = {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "url": require.resolve("url/"),
      "assert": require.resolve("assert/")
    };
    return config;
  }
};
