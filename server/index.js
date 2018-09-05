/*----------  Custom Imports  ----------*/
const expressServer = require('./bin/expressServer');
const config = require('../config/config.js');

/**
 * Start the express server
 */
expressServer.listen(config.port, () => {
  console.log(`Server is listening @ ${config.BASE_URL}:${config.PORT}`);
});
