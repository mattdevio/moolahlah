/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');
const { Router } = require('express');
const bcrypt = require('bcrypt');
const R = require('ramda');

/*----------  Custom Imports  ----------*/
const { logger, sendMail } = require(`${appRoot}/server/bin/utility`);
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
    sendMail({
      to: req.body.emailAddress,
      template: 'WelcomeEmail',
      locals: {
        name: req.body.name,
        emailAddress: req.body.emailAddress,
      },
    });
    logger.debug(`User '${user.name}' saved!`);
    req.session.data = user._id;
    res.status(201);
    return res.json(apiResponse({
      data: Object.assign({
        password: '***********'
      }, R.pick(['name', 'emailAddress'], user)),
      messsage: 'User Created',
    }));

  });

});

userRouter.post('/login', UserModel.loginValidation(), async function(req, res, next) {

  const { emailAddress, password } = req.body;
  logger.debug(`Attempting to login user: ${emailAddress}`);

  let result;
  try {
    result = await UserModel.findOne({ emailAddress }).exec();
  } catch (e) {
    return next(e);
  }

  if (!result) {
    res.status(401);
    return res.json(apiResponse({
      message: 'Sign In Failed',
      status: 0,
      errors: [{
        location: 'body',
        param: 'emailAddress',
        value: emailAddress,
        msg: 'No user with that email. Please try again.',
      }]
    }));
  }

  let passwordMatches;
  try {
    passwordMatches = await bcrypt.compare(password, result.password);
  } catch (e) {
    return next(e);
  }

  if (!passwordMatches) {
    res.status(401);
    return res.json(apiResponse({
      message: 'Sign In Failed',
      status: 0,
      errors: [{
        location: 'body',
        param: 'password',
        value: password,
        msg: 'Wrong password. Try again or click \'Forgot Password\'.',
      }],
    }));
  }

  req.session.data = result._id;
  res.status(200);
  return res.json(apiResponse({
    message: 'Login successful',
    data: Object.assign({
      password: '***********'
    }, R.pick(['name', 'emailAddress'], result)),
  }));

});

userRouter.post('/logout', async function(req, res, next) {

  req.session.destroy((err) => {

    if (err) return next(err);
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200);
    res.json(apiResponse({
      message: 'Session Destroyed',
    }));

  });

});

userRouter.post('/authenticate', async function(req, res, next) {

  if (req.session && req.session.data) {
    let result;
    try {
      result = await UserModel.findById(req.session.data).exec();
    } catch (err) {
      next(err);
    }
    if (result) {
      res.status(200);
      return res.json(apiResponse({
        message: 'Authentication Successful',
        data: {
          name: result.name,
          emailAddress: result.emailAddress,
          password: '***********',
        },
      }));
    }
  }

  res.status(401);
  res.json(apiResponse({
    message: 'Unable To Authenticate',
    status: 0,
  }));

});

// export router
module.exports = userRouter;
