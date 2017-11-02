const config = require('./webpack.config');

config.entry.app.push('react-hot-loader/patch');

config.devServer = {
  disableHostCheck: true,
  historyApiFallback: true
};

module.exports = config;
