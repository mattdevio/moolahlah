// Vendor Imports
const appRoot = require('app-root-path');
const { Router } = require('express');
const bcrypt = require('bcrypt');

// Custom Imports
const { logger, sendMail } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/bin/apiResponse`);
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

  logger.debug(`Attempting to save new user to the database: ${JSON.stringify(req.body, null, 2)}`);
  const { name, emailAddress, password } = req.body;

  let hash;
  try {
    hash = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  } catch (e) {
    return next(e);
  }

  let newUser;
  try {
    newUser = await User.query()
      .insert({
        name: name,
        email: emailAddress,
        password: hash,
      });
  } catch (e) {
    return next(e);
  }

  // Send Mail - Need to promisify this function so we can watch errors better
  sendMail({
    to: newUser.email,
    template: 'WelcomeEmail',
    locals: {
      name: newUser.name,
      emailAddress: newUser.email,
    },
  });

  // Create session and send back response
  logger.debug(`New user saved: ${newUser.email}`);
  req.session.data = { name: newUser.name, emailAddress: newUser.email };
  res.status(201).json(apiResponse({
    data: {
      name: newUser.name,
      emailAddress: newUser.email,
      password: '*********',
    },
    message: 'User created',
  }));

});

userRouter.post('/login', async function(req, res, next) {

  const { emailAddress, password } = req.body;
  logger.debug(`Attempting to login user: ${emailAddress}`);

  res.json(apiResponse({
    message: 'Not Implemented',
    status: 0,
  }));

  // let result;
  // try {
  //   result = await UserModel.findOne({ emailAddress }).exec();
  // } catch (e) {
  //   return next(e);
  // }

  // if (!result) {
  //   res.status(401);
  //   return res.json(apiResponse({
  //     message: 'Sign In Failed',
  //     status: 0,
  //     errors: [{
  //       location: 'body',
  //       param: 'emailAddress',
  //       value: emailAddress,
  //       msg: 'No user with that email. Please try again.',
  //     }]
  //   }));
  // }

  // let passwordMatches;
  // try {
  //   passwordMatches = await bcrypt.compare(password, result.password);
  // } catch (e) {
  //   return next(e);
  // }

  // if (!passwordMatches) {
  //   res.status(401);
  //   return res.json(apiResponse({
  //     message: 'Sign In Failed',
  //     status: 0,
  //     errors: [{
  //       location: 'body',
  //       param: 'password',
  //       value: password,
  //       msg: 'Wrong password. Try again or click \'Forgot Password\'.',
  //     }],
  //   }));
  // }

  // req.session.data = result._id;
  // res.status(200);
  // return res.json(apiResponse({
  //   message: 'Login successful',
  //   data: Object.assign({
  //     password: '***********'
  //   }, R.pick(['name', 'emailAddress'], result)),
  // }));

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

  res.json(apiResponse({
    message: 'Not Implemented',
    status: 0,
  }));

  // if (req.session && req.session.data) {
  //   let result;
  //   try {
  //     result = await UserModel.findById(req.session.data).exec();
  //   } catch (err) {
  //     next(err);
  //   }
  //   if (result) {
  //     res.status(200);
  //     return res.json(apiResponse({
  //       message: 'Authentication Successful',
  //       data: {
  //         name: result.name,
  //         emailAddress: result.emailAddress,
  //         password: '***********',
  //       },
  //     }));
  //   }
  // }

  // res.status(401);
  // res.json(apiResponse({
  //   message: 'Unable To Authenticate',
  //   status: 0,
  // }));

});

// export router
module.exports = userRouter;
