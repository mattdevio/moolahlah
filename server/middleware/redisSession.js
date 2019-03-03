/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

/*----------  Custom Imports  ----------*/
const { logger } = require(`${appRoot}/server/bin/utility`);



function redisSession(expressAppInstance) {

  logger.info('Initializing session middleware');

  const redisSession = session({
    store: new RedisStore({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      logErrors: true,
    }),
    saveUninitialized: true,
    proxy: true,
    secret: process.env.SESSION_SECRET,
    resave: true,
    rolling: true,
    name: process.env.COOKIE_NAME,
    cookie: { maxAge: 3600000 }, // One Hour
  });

  expressAppInstance.use(redisSession);

  expressAppInstance.use(function(req, res, next) {
    let tries = 3;
    const lookupSession = err => {
      if (err) return next(err);
      tries -= 1;
      if (typeof req.session !== 'undefined') return next();
      logger.info('Retrying session lookup');
      if (tries < 0) return next(new Error('No session data'));
      redisSession(req, res, lookupSession);
    };

    lookupSession();
  });

}

module.exports = redisSession;