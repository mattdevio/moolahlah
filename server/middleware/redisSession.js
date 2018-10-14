/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

/*----------  Custom Imports  ----------*/
const { logger } = require(`${appRoot}/server/bin/utility`);



function redisSession(expressAppInstance) {

  logger.info('Attempting to mount redis connected session middleware...');

  expressAppInstance.use(session({
    store: new RedisStore({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      logErrors: (error) => logger.error(`A redis error: ${error.stack}`),
    }),
    proxy: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    name: process.env.COOKIE_NAME
  }));

}

module.exports = redisSession;