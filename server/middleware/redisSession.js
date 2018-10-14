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
    }),
    proxy: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
  }));

}

module.exports = redisSession;