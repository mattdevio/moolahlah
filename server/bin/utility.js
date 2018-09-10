/*----------  Vendor Imports  ----------*/
const chalk = require('chalk');

/*----------  Setup  ----------*/
// eslint-disable-next-line no-console
const logFunc = (process.env.NODE_ENV === 'development') ? console.log : () => {};
const objectIsError = e => e && e.stack && e.message;


/*===============================================
=            Static Utility Class            =
===============================================*/

class Utility {

  constructor() {
    throw new Error('Utility is a static class');
  }

  static log(...args) {
    const enhancedArgs = args.map((arg) => {
      if (objectIsError(arg)) {
        return chalk.red(arg.stack);
      } else if (Array.isArray(arg)) {
        return chalk.magenta(JSON.stringify(arg, null, 2));
      } else if (typeof arg === 'object') {
        return chalk.green(JSON.stringify(arg, null, 2));
      }
      return chalk.underline(arg.toString());
    });
    logFunc.apply(console, enhancedArgs);
  }

}

module.exports = Utility;

/*=====  End of Static Utility Class  ======*/
