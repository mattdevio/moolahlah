/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const mailgun = require('mailgun-js');
const pug = require('pug');

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

function sendMail({ to, template, locals = {} }) {

  const templateFile = `${appRoot}/server/views/${template}.pug`;
  const rendered = pug.renderFile(templateFile, { ...locals,
    baseUrl: process.env.BASE_URL,
  });
  const email = {
    from: process.env.EMAIL_SENDER,
    html: rendered,
    to,
  };
  mailer.messages().send(email, function(err, body) {

    if (err) {
      logger.error(err);
    } else {
      logger.info(`Email queued! ${JSON.stringify(body)}`);
    }

  });

}

module.exports.sendMail = sendMail;

/*=====  End of Mailgun Mailer  ======*/
