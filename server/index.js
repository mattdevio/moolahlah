/*----------  Load .env File First!  ----------*/
require('dotenv').config();

/*----------  Vendor Imports  ----------*/


/*----------  Custom Imports  ----------*/
const expressServer = require('./bin/expressServer');
const utility = require('./bin/utility');

// Start
expressServer.listen(process.env.PORT, () => {
  utility.log(`Server listening on : ${process.env.BASE_URL}:${process.env.PORT}`);
});
