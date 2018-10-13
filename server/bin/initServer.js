/*----------  Vendor Imports  ----------*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const merge = require('webpack-merge');
const appRoot = require('app-root-path');
const helmet = require('helmet');

/*----------  Node Imports  ----------*/
const http = require('http');
const path = require('path');

/*----------  Custom Imports  ----------*/
const commonWebpackConfig = require(`${appRoot}/webpack_config/webpack.common`);
const devWebpackConfig = require(`${appRoot}/webpack_config/webpack.dev`);
const prodWebpackConfig = require(`${appRoot}/webpack_config/webpack.prod`);
const { logger } = require(`${appRoot}/server/bin/utility`);
const loadControllers = require(`${appRoot}/server/bin/loadControllers`);
const serveReactHTML = require(`${appRoot}/server/middleware/serveReactHTML`);
const handleRequestErrors = require(`${appRoot}/server/middleware/handleRequestErrors`);

/*==================================
=            initServer            =
==================================*/

const initServer = () => {
  return new Promise(async (resolve, reject) => {

    const app = express();
    const expressServer = http.Server(app);

    // Secure HTTP Headers
    app.use(helmet());

    // Add Middleware To The Express App
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('tiny', {
      stream: { write: line => logger.info(line.replace(/\n$/, '')) },
    }));

    // Make JSON response pretty :)
    if (process.env.NODE_ENV === 'development') {
      app.set('json spaces', 2);
    }

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

    // Load all the controllers into the app
    await loadControllers(app);

    // Mount React HTML middleware
    app.use(serveReactHTML());

    // Mount Error Middleware
    app.use(handleRequestErrors());

    // Resolve promise with express server
    resolve(expressServer);

  }); // end Promise
}; // end function initServer

module.exports = initServer;

/*=====  End of initServer  ======*/
