/* eslint no-console: 0 */

/*----------  Vendor Imports  ----------*/
const dotenv = require('dotenv');

/*----------  Node Imports  ----------*/
const fs = require('fs');
const path = require('path');

// Load the example env file
const envConfig = dotenv.config({ path: path.resolve(__dirname, '../example.env') }).parsed;

// Merge example env file with parameters
process.argv.slice(2).forEach(keyValuePair => {
  const kvp = keyValuePair.split('=');
  if (kvp[0] in envConfig) {
    envConfig[kvp[0]] = kvp[1];
  } else {
    throw new Error(`Parameter key [${kvp[0]}] doesn't exist in the 'example.env' file.`);
  }
});

// Build config file as a string
console.log('Writing .env File ✏️\n');
let envFile = '';
Object.keys(envConfig).forEach(key => {
  envFile += `${key}=${envConfig[key]}\n`;
});

// Write File
fs.writeFile(path.resolve(__dirname, '../.env'), envFile, 'utf8', () => {
  console.log('Finished! 👍');
});
