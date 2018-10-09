/*----------  Vendor Imports  ----------*/
const { createLogger, format, transports } = require('winston');
const appRoot = require('app-root-path');

/*=======================================
=            Winston Logging            =
=======================================*/

const { combine, timestamp, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp} [${info.level}] ${info.message}`;
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `${appRoot}/temp/combined.log`,
    }),
    new transports.File({
      filename: `${appRoot}/temp/error.log`,
      level: 'error',
    }),
  ],
});

module.exports.logger = logger;

/*=====  End of Winston Logging  ======*/
