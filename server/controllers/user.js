/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');
const { Router } = require('express');
const bcrypt = require('bcrypt');
const R = require('ramda');

/*----------  Custom Imports  ----------*/
const { logger, mailer } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/bin/apiResponse`);
const UserModel = require(`${appRoot}/server/models/user`);

/*----------  Setup  ----------*/
const userRouter = Router();


/**
 * Get the users
 */
userRouter.post('/', UserModel.newUserValidation(), async function(req, res, next) {

  logger.debug(`Attempting to save new user to the database: ${JSON.stringify(req.body)}`);

  let hash;
  try {
    hash = await bcrypt.hash(req.body.password, +process.env.SALT_ROUNDS);
  } catch (e) {
    return next(e);
  }

  UserModel.create({
    name: req.body.name,
    password: hash,
    emailAddress: req.body.emailAddress,
  }, function(err, user){
    if (err) return next(err);
    const response = apiResponse({
      data: Object.assign({
        password: '***********'
      }, R.pick(['name', 'emailAddress'], user)),
      messsage: 'User created successful',
    });

    logger.info('Atempting to send email message to new user');
    const email = {
      from: process.env.EMAIL_SENDER,
      to: user.emailAddress,
      subject: 'Welcome to moolahlah!',
      html: 'Welcome to moolahlah!<br /><br />We just wanted to say hello. 👋',
    };
    mailer.messages().send(email, function(err, body) {
      if (err) {
        logger.error(err);
      } else {
        logger.info(`Email queued! ${JSON.stringify(body)}`);
      }
    });

    logger.debug(`User '${user.name}' saved!`);
    req.session.data = user._id;
    res.status(201);
    return res.json(response);
  });

});

userRouter.post('/login', UserModel.loginValidation(), async function(req, res, next) {

  const { emailAddress, password } = req.body;
  logger.debug(`Attempting to login user: ${emailAddress}`);

  let user;
  try {
    user = await UserModel.findOne({ emailAddress }).exec();
  } catch (e) {
    return next(e);
  }

  if (user) {
    let passwordMatches;
    try {
      passwordMatches = await bcrypt.compare(password, user.password);
    } catch (e) {
      return next(e);
    }

    if (passwordMatches) {
      const response = apiResponse({
        message: 'Login successful',
        data: Object.assign({
          password: '***********'
        }, R.pick(['name', 'emailAddress'], user)),
      });
      req.session.data = user._id;
      res.status(200);
      return res.json(response);
    }
  }

  const response = apiResponse({
    message: 'Email or password invalid',
    status: 0,
  });
  res.status(401);
  return res.json(response);

});

userRouter.post('/logout', async function(req, res, next) {

  if (!req.session) {
    res.status(204);
    res.json(apiResponse({
      message: 'no operation',
    }));
  }

  req.session.destroy((err) => {

    if (err) return next(err);
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200);
    res.json(apiResponse({
      message: 'Logout successful',
    }));

  });

});

// export router
module.exports = userRouter;
