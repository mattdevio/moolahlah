const appRoot = require('app-root-path');
const result = require('dotenv').config({ path: `${appRoot}/.env` });

if (!result) {
  // eslint-disable-next-line no-console
  console.log('Unabled to load .env file; exiting...');
  process.exit(1);
}

const {
  
} = result.parsed;

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
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
      database: 'my_db',
      user:     'username',
      password: 'password'
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
