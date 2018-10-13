/*----------  Vendor Imports ----------*/
const appRoot = require('app-root-path');
const mongoose = require('mongoose');

/*----------  Custom imports  ----------*/
const { logger } = require(`${appRoot}/server/bin/utility`);

/*====================================
=            initDatabase            =
====================================*/

const initDatabase = () => {

  logger.info('Attempting to initialize mongodb via mongoose controller');
  const dbConnectionURI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`;
  logger.debug(`Database connection URI: ${dbConnectionURI}`);

  // Log connections
  mongoose.connection.on('connected', () => {
    logger.info('Mongoose connection open!');
  });

  // Log errors
  mongoose.connection.on('error', error => {
    logger.error(`Mongoose connection error : ${error}`);
  });

  // Log disconnections
  mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose connection disconnected');
  });

  // Shutdown gracefully
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Mongoose connection closed via app termination');
      process.exit(0);
    });
  });

  // Connect!
  mongoose.connect(dbConnectionURI, { useNewUrlParser: true });

};

module.exports = initDatabase;

/*=====  End of initDatabase  ======*/
