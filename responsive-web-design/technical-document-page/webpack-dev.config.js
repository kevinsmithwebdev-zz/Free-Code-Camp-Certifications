module.exports = require('./webpack.config-helper')({
  isProduction: false,
  devtool: 'cheap-eval-source-map',
  port: 3000,
  mode: 'development'
});
