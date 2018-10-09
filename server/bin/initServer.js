/*----------  Vendor Imports  ----------*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const merge = require('webpack-merge');
// const mongoose = require('mongoose');

/*----------  Node Imports  ----------*/
const http = require('http');
const path = require('path');

/*----------  Custom Imports  ----------*/
const commonWebpackConfig = require('../../webpack_config/webpack.common');
const devWebpackConfig = require('../../webpack_config/webpack.dev');
const prodWebpackConfig = require('../../webpack_config/webpack.prod');
const fileRouter = require('../routers/file');
const apiRouter = require('../routers/api');

/*==================================
=            initServer            =
==================================*/

const initServer = () => {
  return new Promise(async (resolve, reject) => {

    const app = express();
    const expressServer = http.Server(app);

    // const dbConnectionURI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`;
    // mongoose.connect(dbConnectionURI, { useNewUrlParser: true });

    // Add Middleware To The Express App
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));

    // Serve static assets
    app.use('/assets', express.static(path.resolve(__dirname, '../assets')));
    app.use('/favicon.ico', express.static(path.resolve(__dirname, '../assets/image/favicon.ico')));

    // Setup Pug Templates
    app.set('view engine', 'pug');
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

    // Add api middleware
    app.use('/api', apiRouter);

    // Add the file router, needs to be the last middleware in the stack
    app.use(fileRouter);

    // Resolve promise with express server
    resolve(expressServer);

  }); // end Promise
}; // end function initServer

module.exports = initServer;

/*=====  End of initServer  ======*/
