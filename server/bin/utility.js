/*----------  Vendor Imports  ----------*/
const { createLogger, format, transports } = require('winston');
const appRoot = require('app-root-path');
const mailgun = require('mailgun-js');

/*=======================================
=            Winston Logging            =
=======================================*/

/**
 * Log Levels
 * 
 * @error => The error log
 * @info  => Non secret app information
 * @debug => Secret app information
 */

const { combine, timestamp, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp} [${info.level}] ${info.message}`;
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
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


/*======================================
=            Mailgun Mailer            =
======================================*/

const mailer = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

module.exports.mailer = mailer;

/*=====  End of Mailgun Mailer  ======*/
