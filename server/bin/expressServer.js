/*----------  Vendor Imports  ----------*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

/*----------  Node Imports  ----------*/
const http = require('http');
const path = require('path');

/*----------  Custom Imports  ----------*/
const config = require('../../config/config.js');


// Start Express Server
const app = express();
const expressServer = http.Server(app);

// Add Middleware To The Express App
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Export Server
module.exports = expressServer;
