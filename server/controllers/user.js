// Vendor Imports
const appRoot = require('app-root-path');
const { Router } = require('express');
const bcrypt = require('bcrypt');
// const { transaction } = require('objection');

// Custom Imports
const { logger, sendMail } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/middleware/apiResponse`);
const protectedRoute = require(`${appRoot}/server/middleware/protectedRoute`);
const { User } = require(`${appRoot}/server/db/models`);

// Setup
const userRouter = Router();

// // Get a reference to the knex sql builder
// const KNEX_INSTANCE = User.knex();


/**
 * POST /
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

/**
 * POST /update_password
 * Allows the user to update their password
 */
userRouter.post('/update_password', protectedRoute(), User.updatePasswordValidation(), async (req, res, next) => {

  const { email } = req.session.data;
  const { password } = req.body;

  // Create hash
  let hash;
  try {
    hash = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  } catch (e) {
    return next(e);
  }

  let updatePassword__;
  try {
    updatePassword__ = await User.query()
      .update({ password: hash })
      .where('email', email);
  } catch (e) {
    return next(e);
  }

  if (updatePassword__ !== 1) return res.status(400).json(apiResponse({
    status: 0,
    message: 'Password not updated',
  }));

  res.json(apiResponse({
    message: 'Password updated',
    data: {
      password: '*********',
    },
  }));

});

/**
 * POST /update_name
 * Allows the user to update their name
 */
userRouter.post('/update_name', protectedRoute(), User.updateNameValidation(), async (req, res, next) => {

  const { email } = req.session.data;
  const { name } = req.body;

  let updateName__;
  try {
    updateName__ = await User.query()
      .update({ name: name })
      .where('email', email);
  } catch (e) {
    return next(e);
  }

  if (updateName__ !== 1) return res.status(400).json(apiResponse({
    status: 0,
    message: 'Unable to update name',
  }));

  // Update Session Data
  req.session.data.name = name;

  res.json(apiResponse({
    message: 'Name updated',
    data: {
      name: name,
    },
  }));

});

/**
 * POST /update_email
 * Updates a user email address
 */
userRouter.post('/update_email', protectedRoute(), User.updateEmailValidation(), async (req, res, next) => {

  const { email, name } = req.session.data;

  let updateEmail__;
  try {
    updateEmail__ = await User.query()
      .update({ email: req.body.email })
      .where('email', email);
  } catch (e) {
    console.dir(e);
    return next(e);
  }

  if (updateEmail__ !== 1) {
    return res.status(400).json(apiResponse({
      message: 'Unable to update email',
      status: 0,
    }));
  }

  // Update Session Data
  req.session.data = {
    email: req.body.email,
    name: name,
  };

  res.json(apiResponse({
    message: 'Email updated',
    data: {
      email: req.body.email,
    },
  }));

});


// export router
module.exports = userRouter;
