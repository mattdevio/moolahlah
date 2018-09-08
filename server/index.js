/*----------  Load .env File First!  ----------*/
require('dotenv').config();

/*----------  Custom Imports  ----------*/
const initServer = require('./bin/initServer');
const utility = require('./bin/utility');

/*----------  Run Server  ----------*/
initServer()
  .then(server => server.listen(process.env.PORT, () => {
    utility.log(`Server listening on ${process.env.BASE_URL}:${process.env.PORT}`);
  }))
  .catch(e => utility.log(e));
