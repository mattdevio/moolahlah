/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');
const { Router } = require('express');
const { readdir } = require('fs');
const { promisify } = require('util');

/*----------  Custom Imports  ----------*/
const { logger } = require(`${appRoot}/server/bin/utility`);

/*----------  Setup  ----------*/
const readDirAsync = promisify(readdir);

/**
 * initController - Builds a route controlled without having to think about mounting it
 * @param  {string}   controllerRoot [The folder inside the controller to build]
 * @return {Promise}  
 */
function initController(controllerRoot) {

  return new Promise(async function(resolve, reject){

    logger.info(`Initializing controller '${controllerRoot}'`);
    const baseDir = `${appRoot}/server/controllers/${controllerRoot}`;
    const router = Router();
    let files;

    try {
      files = await readDirAsync(baseDir);
    } catch (e) {
      return reject(e);
    }

    logger.info(`Directory for '${controllerRoot}' controller loaded : ${JSON.stringify(files)}`);
    files.forEach(file => {

      const handler = require(`${baseDir}/${file}`);
      const route = `/${file.slice(0, -3)}`;
      const mount = router.route(route);

      Object.keys(handler).forEach(key => {
        logger.info(`Binding [${key}] method to '${controllerRoot}' controller on route "${route}"`);
        mount[key](handler[key]);
      });

    });

    logger.info(`Controller "${controllerRoot}" initialized`);
    resolve(router);

  });

}

module.exports = initController;
