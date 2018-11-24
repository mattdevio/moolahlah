const appRoot = require('app-root-path');
const result = require('dotenv').config({ path: `${appRoot}/.env` });

if (!result) {
  // eslint-disable-next-line no-console
  console.log('Unabled to load .env file; exiting...');
  process.exit(1);
}

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DB_NAME,
  MYSQL_USERNAME,
  MYSQL_PASSWORD
} = result.parsed;

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      database: MYSQL_DB_NAME,
      user:     MYSQL_USERNAME,
      password: MYSQL_PASSWORD
    },
    pool: {
      min: 0,
      max: 5
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      database: MYSQL_DB_NAME,
      user:     MYSQL_USERNAME,
      password: MYSQL_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
