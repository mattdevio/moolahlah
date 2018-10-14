/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');
const { Router } = require('express');
const bcrypt = require('bcrypt');
const R = require('ramda');


/*----------  Custom Imports  ----------*/
const { logger } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/bin/apiResponse`);
const UserModel = require(`${appRoot}/server/models/user`);

/*----------  Setup  ----------*/
const userRouter = Router();

/**
 * Get the users
 */
userRouter.post('/', UserModel.newUserValidation(), function(req, res, next) {

  logger.debug(`Attempting to save new user to the database: ${JSON.stringify(req.body)}`);

  const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS || 10);
  const hash = bcrypt.hashSync(req.body.password, salt);

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

  if (user && bcrypt.compareSync(password, user.password)) {
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

  const response = apiResponse({
    message: 'Email or password invalid',
    status: 0,
  });
  res.status(401);
  return res.json(response);

});

// export router
module.exports = userRouter;
