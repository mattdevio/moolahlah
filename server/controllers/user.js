/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');
const { Router } = require('express');
const bcrypt = require('bcrypt');
const R = require('ramda');


/*----------  Custom Imports  ----------*/
const { logger } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/bin/apiResponse`);
const user = require(`${appRoot}/server/models/user`);

/*----------  Setup  ----------*/
const userRouter = Router();

/**
 * Get the users
 */
userRouter.post('/', user.newUserValidation(), function(req, res, next) {

  const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS || 10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  user.create({
    name: req.body.name,
    password: hash,
    emailAddress: req.body.emailAddress,
  }, function(err, user){
    if (err) return next(err);
    const response = apiResponse({
      data: Object.assign({
        password: '***********'
      }, R.pick(['name', 'emailAddress'], user)),
      messsage: 'User created successfully',
    });
    res.json(response);
  });

});

// export router
module.exports = userRouter;
