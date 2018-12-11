// Vendor Imports
const appRoot = require('app-root-path');
const { Router } = require('express');
const bcrypt = require('bcrypt');

// Custom Imports
const { logger, sendMail } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/middleware/apiResponse`);
const protectedRoute = require(`${appRoot}/server/middleware/protectedRoute`);
const { User } = require(`${appRoot}/server/db/models`);

// Setup
const userRouter = Router();

/**
 * POST /user
 * Creates a new user in the database
 * Sends Welcome Email
 * Starts a session for future REST requests
 */
userRouter.post('/', User.newUserValidation(), async function(req, res, next) {

  const { body } = req;
  logger.debug(`Attempting to save new user to the database: ${JSON.stringify(body.email, null, 2)}`);

  let hash;
  try {
    hash = await bcrypt.hash(body.password, +process.env.SALT_ROUNDS);
  } catch (e) {
    return next(e);
  }

  let newUser;
  try {
    newUser = await User.query()
      .insert({
        name: body.name,
        email: body.email,
        password: hash,
      });
  } catch (e) {
    return next(e);
  }

  // Send Mail
  // Need to promisify this function so we can watch errors better
  sendMail({
    to: newUser.email,
    template: 'WelcomeEmail',
    locals: {
      name: newUser.name,
      emailAddress: newUser.email,
    },
  });

  logger.debug(`New user saved: ${newUser.email}`);
  req.session.data = { name: newUser.name, email: newUser.email };
  res.status(201).json(apiResponse({
    data: {
      name: newUser.name,
      email: newUser.email,
      password: '*********',
    },
    message: 'User created',
  }));

});

/**
 * POST /login
 * Authenticates a user by email and password
 * Starts a session for future request
 */
userRouter.post('/login', User.loginUserValidation(), async function(req, res, next) {

  const { body } = req;
  logger.debug(`Attempting to login user: ${body.email}`);

  let result;
  try {
    [ result ] = await User.query()
      .select('name', 'email', 'password')
      .where('email', body.email);
  } catch (e) {
    return next(e);
  }

  if (!result) {
    return res.status(401).json(apiResponse({
      message: 'Sign in failed',
      status: 0,
      errors: [{
        location: 'body',
        param: 'email',
        value: body.email,
        msg: 'No user with that email',
      }]
    }));
  }

  let passwordMatches;
  try {
    passwordMatches = await bcrypt.compare(body.password, result.password);
  } catch (e) {
    return next(e);
  }

  if (!passwordMatches) {
    return res.status(401).json(apiResponse({
      message: 'Sign in failed',
      status: 0,
      errors: [{
        location: 'body',
        param: 'password',
        value: body.password,
        msg: 'Invalid password',
      }],
    }));
  }

  logger.debug(`User ${result.email} logged in!`);
  req.session.data = { name: result.name, email: result.email };
  res.status(200).json(apiResponse({
    message: 'Login successful',
    data: Object.assign({
      name: result.name,
      email: result.email, 
      password: '*********',
    }),
  }));

});

/**
 * POST /logout
 * Destroys an active session for the user
 */
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

/**
 * PROTECTED ROUTE
 * GET /profile
 * Fetch the users profile information
 */
userRouter.get('/profile', protectedRoute(), async function(req, res, next) {

  let result;
  try {
    [ result ] = await User.query()
      .select('name', 'email')
      .where('email', req.session.data.email);
    if (!result) next(new Error('Empty query response'));
  } catch (err) {
    return next(err);
  }


  res.status(200).json(apiResponse({
    data: {
      name: result.name,
      email: result.email,
      password: '*********',
    },
  }));

});

// export router
module.exports = userRouter;
