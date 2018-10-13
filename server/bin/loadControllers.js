/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');
const { readdir } = require('fs');
const { promisify } = require('util');

/*----------  Custom Imports  ----------*/
const { logger } = require(`${appRoot}/server/bin/utility`);

/*----------  Setup  ----------*/
const readDirAsync = promisify(readdir);


/*=======================================
=            loadControllers            =
=======================================*/

async function loadControllers(expressAppInstance) {

  const baseDir = `${appRoot}/server/controllers`;

  try {
    const files = await readDirAsync(baseDir);
    logger.info(`Attempting to load controllers : ${JSON.stringify(files)}`);
    files.forEach(file => {

      const controllerName = file.slice(0, -3);
      const urlBase = `/${controllerName}`;
      const router = require(`${baseDir}/${file}`);
      expressAppInstance.use(urlBase, router);
      logger.info(`Mounted "${controllerName}" controller @ url base [${urlBase}]`);

    });
  } catch (err) {
    logger.error(`Error caught while loading controllers : ${err.stack}`);
  }

}

module.exports = loadControllers;

/*=====  End of loadControllers  ======*/
