/*----------  Vendor Imports  ----------*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const merge = require('webpack-merge');

/*----------  Node Imports  ----------*/
const http = require('http');
const path = require('path');

/*----------  Custom Imports  ----------*/
const commonWebpackConfig = require('../../webpack_config/webpack.common');
const devWebpackConfig = require('../../webpack_config/webpack.dev');
const prodWebpackConfig = require('../../webpack_config/webpack.prod');

/*==================================
=            initServer            =
==================================*/

const initServer = () => {
  return new Promise(async (resolve, reject) => {

    const app = express();
    const expressServer = http.Server(app);
    
    // Add Middleware To The Express App
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));

    // Setup Pug Templates
    app.set('view enginge', 'pug');
    app.set('views', path.resolve(__dirname, '../views'));

    // Load common webpack file
    let common;
    try {
      common = await commonWebpackConfig();
    } catch (e) {
      return reject(e);
    }

    // Flatten webpack configs and run though webpack compiler
    const fullWebpackConfig = merge(common, (process.env.NODE_ENV === 'development') ? devWebpackConfig : prodWebpackConfig);
    const compiler = webpack(fullWebpackConfig);

    // Serve webpack bundles with webpack dev middleware
    app.use(webpackDevMiddleware(compiler, {
      publicPath: fullWebpackConfig.output.publicPath,
    }));

    // Resolve promise with express server
    resolve(expressServer);

  }); // end Promise
}; // end function initServer

module.exports = initServer;

/*=====  End of initServer  ======*/
